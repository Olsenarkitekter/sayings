import Foundation

@MainActor
final class ProverbsViewModel: ObservableObject {
    @Published private(set) var proverbs: [Proverb] = []
    @Published private(set) var favoriteIDs: Set<UUID> = []
    @Published var selectedCategory: String = CategoryFilter.all
    @Published var isLoading = false
    @Published var errorMessage: String?

    private let client: SupabaseClient
    private let cache: ProverbsCache
    private let favoritesStore: FavoritesStore

    init(
        client: SupabaseClient = SupabaseClient(),
        cache: ProverbsCache = ProverbsCache(),
        favoritesStore: FavoritesStore = FavoritesStore()
    ) {
        self.client = client
        self.cache = cache
        self.favoritesStore = favoritesStore
        self.proverbs = cache.load()
        self.favoriteIDs = favoritesStore.load()
    }

    var categories: [String] {
        let values = proverbs.compactMap(\.category).filter { !$0.isEmpty }
        return [CategoryFilter.all] + Array(Set(values)).sorted()
    }

    var filteredProverbs: [Proverb] {
        guard selectedCategory != CategoryFilter.all else {
            return proverbs
        }
        return proverbs.filter { $0.category == selectedCategory }
    }

    var favoriteProverbs: [Proverb] {
        proverbs.filter { favoriteIDs.contains($0.id) }
    }

    var featuredProverb: Proverb? {
        filteredProverbs.first ?? proverbs.first
    }

    func refresh() async {
        isLoading = true
        errorMessage = nil
        defer { isLoading = false }

        do {
            let fresh = try await client.fetchProverbs()
            proverbs = fresh
            cache.save(fresh)
        } catch {
            errorMessage = error.localizedDescription
        }
    }

    func isFavorite(_ proverb: Proverb) -> Bool {
        favoriteIDs.contains(proverb.id)
    }

    func toggleFavorite(_ proverb: Proverb) {
        let wasFavorite = favoriteIDs.contains(proverb.id)
        let amount = wasFavorite ? -1 : 1

        if wasFavorite {
            favoriteIDs.remove(proverb.id)
        } else {
            favoriteIDs.insert(proverb.id)
        }
        favoritesStore.save(favoriteIDs)
        updateLocalFavoriteCount(for: proverb.id, amount: amount)

        Task {
            do {
                let count = try await client.adjustFavoriteCount(proverbID: proverb.id, amount: amount)
                await MainActor.run {
                    setFavoriteCount(count, for: proverb.id)
                    cache.save(proverbs)
                }
            } catch {
                await MainActor.run {
                    if wasFavorite {
                        favoriteIDs.insert(proverb.id)
                    } else {
                        favoriteIDs.remove(proverb.id)
                    }
                    favoritesStore.save(favoriteIDs)
                    updateLocalFavoriteCount(for: proverb.id, amount: -amount)
                    errorMessage = error.localizedDescription
                }
            }
        }
    }

    private func updateLocalFavoriteCount(for id: UUID, amount: Int) {
        guard let index = proverbs.firstIndex(where: { $0.id == id }) else {
            return
        }
        proverbs[index].favoriteCount = max(0, proverbs[index].favoriteCount + amount)
        cache.save(proverbs)
    }

    private func setFavoriteCount(_ count: Int, for id: UUID) {
        guard let index = proverbs.firstIndex(where: { $0.id == id }) else {
            return
        }
        proverbs[index].favoriteCount = max(0, count)
    }
}

enum CategoryFilter {
    static let all = "Alle"
}
