# Schema Plan - SoundSphere

## Overview
This schema supports the core features of SoundSphere: personalized playlists, mood-based discovery, user library, and social sharing.

## Tables

### 1. `profiles`
*   **Description**: Extends Supabase `auth.users` with application-specific profile data.
*   **Columns**:
    *   `id`: UUID (Primary Key, Foreign Key -> auth.users.id)
    *   `username`: Text (Unique)
    *   `full_name`: Text
    *   `avatar_url`: Text
    *   `bio`: Text
    *   `website`: Text
    *   `created_at`: Timestamptz
    *   `updated_at`: Timestamptz

### 2. `artists`
*   **Description**: Metadata for music artists.
*   **Columns**:
    *   `id`: UUID (Primary Key)
    *   `name`: Text
    *   `bio`: Text
    *   `image_url`: Text
    *   `genre_tags`: Text[] (Array of genre strings)
    *   `created_at`: Timestamptz

### 3. `albums`
*   **Description**: Collection of tracks.
*   **Columns**:
    *   `id`: UUID (Primary Key)
    *   `title`: Text
    *   `artist_id`: UUID (Foreign Key -> artists.id)
    *   `release_date`: Date
    *   `cover_image_url`: Text
    *   `genre`: Text
    *   `created_at`: Timestamptz

### 4. `tracks`
*   **Description**: Individual songs/tracks with AI-relevant metadata.
*   **Columns**:
    *   `id`: UUID (Primary Key)
    *   `title`: Text
    *   `artist_id`: UUID (Foreign Key -> artists.id)
    *   `album_id`: UUID (Foreign Key -> albums.id)
    *   `duration_seconds`: Integer
    *   `file_url`: Text (Storage path)
    *   `mood_tags`: Text[] (Crucial for "Mood-based discovery")
    *   `energy_level`: Float (0.0 - 1.0, for AI matching)
    *   `valence`: Float (0.0 - 1.0, happiness/sadness metric)
    *   `tempo_bpm`: Integer
    *   `play_count`: BigInt (Global popularity metric)
    *   `created_at`: Timestamptz

### 5. `playlists`
*   **Description**: User-created and AI-generated collections.
*   **Columns**:
    *   `id`: UUID (Primary Key)
    *   `owner_id`: UUID (Foreign Key -> profiles.id)
    *   `title`: Text
    *   `description`: Text
    *   `cover_image_url`: Text
    *   `is_public`: Boolean (Default: true)
    *   `is_collaborative`: Boolean (Default: false)
    *   `is_ai_generated`: Boolean (Default: false)
    *   `mood_target`: Text (If AI generated, what mood?)
    *   `created_at`: Timestamptz
    *   `updated_at`: Timestamptz

### 6. `playlist_tracks`
*   **Description**: Join table connecting tracks to playlists.
*   **Columns**:
    *   `playlist_id`: UUID (Primary Key, Foreign Key -> playlists.id)
    *   `track_id`: UUID (Primary Key, Foreign Key -> tracks.id)
    *   `added_by`: UUID (Foreign Key -> profiles.id)
    *   `added_at`: Timestamptz
    *   `sort_order`: Integer

### 7. `user_favorites`
*   **Description**: Polymorphic-style or specific table for liking content. (Using specific for clarity).
*   **Columns**:
    *   `user_id`: UUID (Primary Key, Foreign Key -> profiles.id)
    *   `item_id`: UUID (Primary Key, Poly-key)
    *   `item_type`: Text ('track', 'album', 'playlist')
    *   `created_at`: Timestamptz

### 8. `listening_history`
*   **Description**: Logs plays to feed the recommendation engine.
*   **Columns**:
    *   `id`: UUID (Primary Key)
    *   `user_id`: UUID (Foreign Key -> profiles.id)
    *   `track_id`: UUID (Foreign Key -> tracks.id)
    *   `played_at`: Timestamptz
    *   `device_type`: Text
    *   `context_mood`: Text (Optional: what mood was the user in?)

### 9. `follows`
*   **Description**: Social graph connections.
*   **Columns**:
    *   `follower_id`: UUID (Primary Key, Foreign Key -> profiles.id)
    *   `following_id`: UUID (Primary Key, Foreign Key -> profiles.id)
    *   `created_at`: Timestamptz

## Security Policies (RLS Strategy)
1.  `profiles`: Public read, Owner update.
2.  `playlists`: Public read if `is_public`, Collaborators update if `is_collaborative`, Owner delete.
3.  `tracks/albums/artists`: Public read (Admin write only).
4.  `user_favorites`: Owner read/write.
5.  `listening_history`: Owner read (Admin/System read for AI).
