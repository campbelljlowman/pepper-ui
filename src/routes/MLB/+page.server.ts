import { supabase } from "$lib/supabaseClient";

export async function load() {
    const { data, error } = await supabase.from("mlb_game_today").select(`
    title,
    timestamptz,
    stream_link,
    home_team:mlb_team!mlb_game_today_home_team_fkey ( short_display_name, display_name, logo, abbreviation, division, league ),
    away_team:mlb_team!mlb_game_today_away_team_fkey ( short_display_name, display_name, logo, abbreviation, division, league )
    `);

    if (error) {
        console.log(error);
    }

    return {
        mlb_games_today: data ?? []
    };
  }