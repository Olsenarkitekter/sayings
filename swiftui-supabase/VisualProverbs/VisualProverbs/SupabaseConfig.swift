import Foundation

enum SupabaseConfig {
    static let projectURL = URL(string: "https://piccvnrbwqlxnhkgfklc.supabase.co")!
    static let anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpY2N2bnJid3FseG5oa2dma2xjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0OTY0MjAsImV4cCI6MjA3OTA3MjQyMH0.YyD5VeiIQd0Apz8WQCsAuqWPog_NtBB6Sw0uuaFPb34"

    static func restURL(path: String) -> URL {
        URL(string: "\(projectURL.absoluteString)/rest/v1/\(path)")!
    }
}
