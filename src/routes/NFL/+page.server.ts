export async function load({ locals: { supabase } }) {
    const { data, error } = await supabase.from("nfl_game_today").select(`
    title,
    start_time,
    game_stream:game_stream ( id, view_price ),
    home_team:nfl_team!nfl_game_today_home_team_fkey ( short_display_name, display_name, logo, abbreviation, division, conference ),
    away_team:nfl_team!nfl_game_today_away_team_fkey ( short_display_name, display_name, logo, abbreviation, division, conference )
    `);

    if (error) {
        console.log(error);
    }

    return {
        nfl_games_today: data ?? []
    };
  }