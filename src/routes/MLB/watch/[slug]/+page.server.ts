export const load = async ({ params, locals: { supabase } }) => {
    const mlbGameID = params.slug

    if (mlbGameID === undefined || isNaN(+mlbGameID!) ){
        console.log("Invalid game strem ID")
        return {
            mlbGameToday: null
        }
    }

    const { data: mlbGameToday, error } = await supabase.from('mlb_game_today').select(`
        id,
        title,
        start_time,
        view_price_dollars,
        stream_link:stream_link ( stream_link, title ),
        home_team:mlb_team!mlb_game_today_home_team_id_fkey ( short_display_name, display_name, logo, abbreviation, division, league ),
        away_team:mlb_team!mlb_game_today_away_team_id_fkey ( short_display_name, display_name, logo, abbreviation, division, league )
        `).eq('id', +mlbGameID!).limit(1).single()

    if (error) {
        console.log(`Error getting stream: ${error.message}`)
    }

    return {
        mlbGameToday
    };
}