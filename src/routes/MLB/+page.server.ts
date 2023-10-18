export async function load({ locals: { supabase } }) {
    const { data, error } = await supabase.from("mlb_game_today").select(`
    id,
    title,
    start_time,
    view_price_dollars,
    home_team:mlb_team!mlb_game_today_home_team_id_fkey ( short_display_name, display_name, logo, abbreviation, division, league ),
    away_team:mlb_team!mlb_game_today_away_team_id_fkey ( short_display_name, display_name, logo, abbreviation, division, league )
    `);

    if (error) {
        console.log(error);
    }

    return {
        mlbGamesToday: data ?? []
    };
  }