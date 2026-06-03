import Foundation

struct ProverbsCache {
    private let key = "cached_proverbs"
    private let decoder = DateCoding.supabaseDecoder
    private let encoder = DateCoding.cacheEncoder

    func load() -> [Proverb] {
        guard let data = UserDefaults.standard.data(forKey: key) else {
            return []
        }
        return (try? decoder.decode([Proverb].self, from: data)) ?? []
    }

    func save(_ proverbs: [Proverb]) {
        guard let data = try? encoder.encode(proverbs) else {
            return
        }
        UserDefaults.standard.set(data, forKey: key)
    }
}
