import Foundation

struct FavoritesStore {
    private let key = "favorite_proverb_ids"

    func load() -> Set<UUID> {
        let values = UserDefaults.standard.stringArray(forKey: key) ?? []
        return Set(values.compactMap(UUID.init(uuidString:)))
    }

    func save(_ ids: Set<UUID>) {
        let values = ids.map(\.uuidString).sorted()
        UserDefaults.standard.set(values, forKey: key)
    }
}
