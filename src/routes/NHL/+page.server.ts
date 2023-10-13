import { supabase } from "$lib/supabaseClient";

export async function load() {
    const { data, error } = await supabase.from("nhl_game_today").select(`
    title,
    start_time,
    game_stream:game_stream ( id, view_price ),
    home_team:nhl_team!nhl_game_today_home_team_fkey ( short_display_name, display_name, logo, abbreviation, division, conference ),
    away_team:nhl_team!nhl_game_today_away_team_fkey ( short_display_name, display_name, logo, abbreviation, division, conference )
    `);

    if (error) {
        console.log(error);
    }

    return {
        nhl_games_today: data ?? []
    };
  }