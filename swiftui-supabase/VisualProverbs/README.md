# VisualProverbs SwiftUI + Supabase

Small native iOS prototype for showing visual proverbs from Supabase.

## Backend

- Supabase project: `piccvnrbwqlxnhkgfklc`
- Table: `public.proverbs`
- Storage bucket: `proverb-images`
- Public read is enabled for proverbs and images.
- Favorites are stored locally on the iPhone.
- Favorite counts are changed through `adjust_proverb_favorite_count(proverb_id, amount)`, which only accepts `1` and `-1` and never lets the counter go below `0`.

## Run

Open `VisualProverbs.xcodeproj` in Xcode and run the `VisualProverbs` scheme on an iPhone simulator or device.

The app uses the Supabase REST API directly, so it does not need the Supabase Swift SDK.

## Uploading New Proverbs

1. Upload the image to the `proverb-images` bucket in Supabase Storage.
2. Copy the public image URL.
3. Insert a row in `public.proverbs` with:
   - `quote`
   - `image_url`
   - `category`
   - `language`
4. Leave `favorite_count` and `created_at` blank unless you need to override them.

New rows are visible automatically the next time the app refreshes or starts.
