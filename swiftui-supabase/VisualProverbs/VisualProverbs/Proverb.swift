import Foundation

struct Proverb: Identifiable, Codable, Equatable {
    let id: UUID
    let quote: String
    let imageURL: URL?
    let category: String?
    let language: String
    var favoriteCount: Int
    let createdAt: Date

    enum CodingKeys: String, CodingKey {
        case id
        case quote
        case imageURL = "image_url"
        case category
        case language
        case favoriteCount = "favorite_count"
        case createdAt = "created_at"
    }
}
