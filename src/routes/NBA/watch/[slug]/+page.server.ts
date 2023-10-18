export const load = async ({ params, locals: { supabase } }) => {
    const nbaGameID = params.slug

    if (nbaGameID === undefined || isNaN(+nbaGameID!) ){
        console.log("Invalid game strem ID")
        return {
            nbaGameToday: null
        }
    }

    const { data: nbaGameToday, error } = await supabase.from('nba_game_today').select(`
        id,
        title,
        start_time,
        view_price_dollars,
        stream_link:stream_link ( stream_link, title ),
        home_team:nba_team!nba_game_today_home_team_id_fkey ( short_display_name, display_name, logo, abbreviation, division, conference ),
        away_team:nba_team!nba_game_today_away_team_id_fkey ( short_display_name, display_name, logo, abbreviation, division, conference )
        `).eq('id', +nbaGameID!).limit(1).single()

    if (error) {
        console.log(`Error getting stream: ${error.message}`)
    }

    return {
        nbaGameToday
    };
}