export const load = async ({ params, locals: { supabase } }) => {
    const mlb_game_id = params.slug

    if (mlb_game_id === undefined || isNaN(+mlb_game_id!) ){
        console.log("Invalid game strem ID")
        return {
            mlb_game_today: null
        }
    }

    const { data: mlb_game_today, error } = await supabase.from('mlb_game_today').select(`
        id,
        title,
        start_time,
        view_price_dollars,
        stream_link:stream_link ( stream_link, title ),
        home_team:mlb_team!mlb_game_today_home_team_id_fkey ( short_display_name, display_name, logo, abbreviation, division, league ),
        away_team:mlb_team!mlb_game_today_away_team_id_fkey ( short_display_name, display_name, logo, abbreviation, division, league )
        `).eq('id', +mlb_game_id!).limit(1).single()

    if (error) {
        console.log(`Error getting stream: ${error.message}`)
    }

    return {
        mlb_game_today
    };
}