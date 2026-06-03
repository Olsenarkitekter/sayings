import Foundation

struct SupabaseClient {
    private let session: URLSession
    private let decoder: JSONDecoder

    init(session: URLSession = .shared) {
        self.session = session
        self.decoder = DateCoding.supabaseDecoder
    }

    func fetchProverbs() async throws -> [Proverb] {
        let url = SupabaseConfig.restURL(path: "proverbs")
            .appending(queryItems: [
                URLQueryItem(name: "select", value: "*"),
                URLQueryItem(name: "order", value: "created_at.desc")
            ])

        var request = URLRequest(url: url)
        request.httpMethod = "GET"
        addHeaders(to: &request)

        let (data, response) = try await session.data(for: request)
        try validate(response: response, data: data)
        return try decoder.decode([Proverb].self, from: data)
    }

    func adjustFavoriteCount(proverbID: UUID, amount: Int) async throws -> Int {
        let url = SupabaseConfig.restURL(path: "rpc/adjust_proverb_favorite_count")
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        addHeaders(to: &request)
        request.httpBody = try JSONEncoder().encode(FavoritePayload(proverbID: proverbID, amount: amount))

        let (data, response) = try await session.data(for: request)
        try validate(response: response, data: data)
        return try JSONDecoder().decode(Int.self, from: data)
    }

    private func addHeaders(to request: inout URLRequest) {
        request.setValue(SupabaseConfig.anonKey, forHTTPHeaderField: "apikey")
        request.setValue("Bearer \(SupabaseConfig.anonKey)", forHTTPHeaderField: "Authorization")
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue("application/json", forHTTPHeaderField: "Accept")
    }

    private func validate(response: URLResponse, data: Data) throws {
        guard let http = response as? HTTPURLResponse else {
            throw SupabaseError.invalidResponse
        }
        guard (200..<300).contains(http.statusCode) else {
            let message = String(data: data, encoding: .utf8) ?? "Unknown Supabase error"
            throw SupabaseError.requestFailed(statusCode: http.statusCode, message: message)
        }
    }
}

private struct FavoritePayload: Encodable {
    let proverbID: UUID
    let amount: Int

    enum CodingKeys: String, CodingKey {
        case proverbID = "proverb_id"
        case amount
    }
}

enum SupabaseError: Error, LocalizedError {
    case invalidResponse
    case requestFailed(statusCode: Int, message: String)

    var errorDescription: String? {
        switch self {
        case .invalidResponse:
            return "Supabase returned an invalid response."
        case let .requestFailed(statusCode, message):
            return "Supabase request failed with \(statusCode): \(message)"
        }
    }
}
