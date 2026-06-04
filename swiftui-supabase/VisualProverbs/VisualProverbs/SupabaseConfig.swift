import Foundation

enum SupabaseConfig {
    static let projectURL = URL(string: "https://tgndxvfmkolmibtoeuti.supabase.co")!
    static let anonKey = "sb_publishable_gkpLsDT2NuNziAV8WWGgJw_GgMOjLeH"

    static func restURL(path: String) -> URL {
        URL(string: "\(projectURL.absoluteString)/rest/v1/\(path)")!
    }
}
