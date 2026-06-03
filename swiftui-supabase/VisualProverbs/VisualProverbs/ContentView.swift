import SwiftUI

struct ContentView: View {
    @StateObject private var viewModel = ProverbsViewModel()

    var body: some View {
        TabView {
            NavigationStack {
                HomeView(viewModel: viewModel)
            }
            .tabItem {
                Label("Forside", systemImage: "sparkles")
            }

            NavigationStack {
                ProverbsGridView(title: "Alle ordsprog", proverbs: viewModel.filteredProverbs, viewModel: viewModel)
            }
            .tabItem {
                Label("Alle", systemImage: "square.grid.2x2")
            }

            NavigationStack {
                ProverbsGridView(title: "Mine favoritter", proverbs: viewModel.favoriteProverbs, viewModel: viewModel)
            }
            .tabItem {
                Label("Favoritter", systemImage: "heart.fill")
            }
        }
        .task {
            await viewModel.refresh()
        }
    }
}

private struct HomeView: View {
    @ObservedObject var viewModel: ProverbsViewModel

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 22) {
                header
                CategoryPicker(viewModel: viewModel)

                if let proverb = viewModel.featuredProverb {
                    ProverbCard(proverb: proverb, isLarge: true, viewModel: viewModel)
                } else {
                    EmptyStateView(text: "Ingen ordsprog endnu. Tilføj en række i Supabase, så dukker den op her.")
                }

                if viewModel.isLoading {
                    ProgressView("Henter nye ordsprog")
                        .frame(maxWidth: .infinity)
                        .padding(.top, 8)
                }

                if let error = viewModel.errorMessage {
                    Text(error)
                        .font(.footnote.weight(.semibold))
                        .foregroundStyle(.red)
                }
            }
            .padding(20)
        }
        .navigationTitle("Visay")
        .toolbar {
            Button {
                Task { await viewModel.refresh() }
            } label: {
                Image(systemName: "arrow.clockwise")
            }
            .accessibilityLabel("Opdater ordsprog")
        }
    }

    private var header: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("Visuelle ordsprog")
                .font(.largeTitle.weight(.black))
            Text("Nye ordsprog fra Supabase vises automatisk, uden en ny App Store-opdatering.")
                .font(.subheadline.weight(.medium))
                .foregroundStyle(.secondary)
        }
    }
}

private struct ProverbsGridView: View {
    let title: String
    let proverbs: [Proverb]
    @ObservedObject var viewModel: ProverbsViewModel

    private let columns = [
        GridItem(.adaptive(minimum: 160), spacing: 14)
    ]

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                CategoryPicker(viewModel: viewModel)

                if proverbs.isEmpty {
                    EmptyStateView(text: title == "Mine favoritter" ? "Du har ingen favoritter endnu." : "Ingen ordsprog i denne kategori.")
                } else {
                    LazyVGrid(columns: columns, spacing: 14) {
                        ForEach(proverbs) { proverb in
                            ProverbCard(proverb: proverb, isLarge: false, viewModel: viewModel)
                        }
                    }
                }
            }
            .padding(16)
        }
        .navigationTitle(title)
        .toolbar {
            Button {
                Task { await viewModel.refresh() }
            } label: {
                Image(systemName: "arrow.clockwise")
            }
            .accessibilityLabel("Opdater ordsprog")
        }
    }
}

private struct CategoryPicker: View {
    @ObservedObject var viewModel: ProverbsViewModel

    var body: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 8) {
                ForEach(viewModel.categories, id: \.self) { category in
                    Button {
                        viewModel.selectedCategory = category
                    } label: {
                        Text(category.capitalized)
                            .font(.callout.weight(.bold))
                            .padding(.horizontal, 14)
                            .padding(.vertical, 9)
                            .background(viewModel.selectedCategory == category ? Color.primary : Color.secondary.opacity(0.12))
                            .foregroundStyle(viewModel.selectedCategory == category ? Color(.systemBackground) : Color.primary)
                            .clipShape(Capsule())
                    }
                }
            }
        }
    }
}

private struct ProverbCard: View {
    let proverb: Proverb
    let isLarge: Bool
    @ObservedObject var viewModel: ProverbsViewModel

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            visual
            VStack(alignment: .leading, spacing: 10) {
                Text(proverb.quote)
                    .font(isLarge ? .title2.weight(.black) : .headline.weight(.black))
                    .lineLimit(isLarge ? nil : 4)

                HStack {
                    Text(proverb.category?.capitalized ?? proverb.language.uppercased())
                        .font(.caption.weight(.heavy))
                        .foregroundStyle(.secondary)

                    Spacer()

                    Label("\(proverb.favoriteCount)", systemImage: "heart")
                        .font(.caption.weight(.bold))
                        .foregroundStyle(.secondary)
                }

                Button {
                    viewModel.toggleFavorite(proverb)
                } label: {
                    Label(
                        viewModel.isFavorite(proverb) ? "Favorit" : "Gem",
                        systemImage: viewModel.isFavorite(proverb) ? "heart.fill" : "heart"
                    )
                    .font(.callout.weight(.bold))
                    .frame(maxWidth: .infinity)
                }
                .buttonStyle(.borderedProminent)
            }
            .padding([.horizontal, .bottom], 14)
        }
        .background(Color(.secondarySystemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 8, style: .continuous))
    }

    private var visual: some View {
        ZStack {
            Rectangle()
                .fill(Color(.tertiarySystemBackground))

            if let url = proverb.imageURL {
                AsyncImage(url: url) { phase in
                    switch phase {
                    case let .success(image):
                        image
                            .resizable()
                            .scaledToFill()
                    case .failure:
                        Image(systemName: "photo")
                            .font(.largeTitle)
                            .foregroundStyle(.secondary)
                    default:
                        ProgressView()
                    }
                }
            } else {
                Image(systemName: "quote.bubble")
                    .font(.largeTitle)
                    .foregroundStyle(.secondary)
            }
        }
        .frame(maxWidth: .infinity)
        .aspectRatio(isLarge ? 1.1 : 1, contentMode: .fit)
        .clipped()
    }
}

private struct EmptyStateView: View {
    let text: String

    var body: some View {
        Text(text)
            .font(.callout.weight(.semibold))
            .foregroundStyle(.secondary)
            .frame(maxWidth: .infinity, minHeight: 160)
            .multilineTextAlignment(.center)
            .padding()
            .background(Color(.secondarySystemBackground))
            .clipShape(RoundedRectangle(cornerRadius: 8, style: .continuous))
    }
}

#Preview {
    ContentView()
}
