export async function load({ locals: { supabase } }) {
    const { data, error } = await supabase.from("cfb_game_today").select(`
    id,
    title,
    start_time,
    view_price_dollars,
    home_team:cfb_team!cfb_game_today_home_team_id_fkey ( short_display_name, display_name, logo, abbreviation, conference ),
    away_team:cfb_team!cfb_game_today_away_team_id_fkey ( short_display_name, display_name, logo, abbreviation, conference )
    `);

    if (error) {
        console.log(error);
    }

    return {
        cfbGamesToday: data ?? []
    };
  }