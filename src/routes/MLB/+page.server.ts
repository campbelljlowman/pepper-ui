export async function load({ locals: { supabase } }) {
    const { data, error } = await supabase.from("mlb_game_today").select(`
    title,
    start_time,
    game_stream:game_stream ( id, view_price ),
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