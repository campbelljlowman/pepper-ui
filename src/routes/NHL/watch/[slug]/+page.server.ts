export const load = async ({ params, locals: { supabase } }) => {
    const nhlGameID = params.slug

    if (nhlGameID === undefined || isNaN(+nhlGameID!) ){
        console.log("Invalid game strem ID")
        return {
            nhlGameToday: null
        }
    }

    const { data: nhlGameToday, error } = await supabase.from('nhl_game_today').select(`
        id,
        title,
        start_time,
        view_price_dollars,
        stream_link:stream_link ( stream_link, title ),
        home_team:nhl_team!nhl_game_today_home_team_id_fkey ( short_display_name, display_name, logo, abbreviation, division, conference ),
        away_team:nhl_team!nhl_game_today_away_team_id_fkey ( short_display_name, display_name, logo, abbreviation, division, conference )
        `).eq('id', +nhlGameID!).limit(1).single()

    if (error) {
        console.log(`Error getting stream: ${error.message}`)
    }

    return {
        nhlGameToday
    };
}