export const load = async ({ params, locals: { supabase } }) => {
    const nflGameID = params.slug

    if (nflGameID === undefined || isNaN(+nflGameID!) ){
        console.log("Invalid game strem ID")
        return {
            nflGameToday: null
        }
    }

    const { data: nflGameToday, error } = await supabase.from('nfl_game_today').select(`
        title,
        start_time,
        view_price_dollars,
        stream_link:stream_link ( stream_link, title ),
        home_team:nfl_team!nfl_game_today_home_team_id_fkey ( short_display_name, display_name, logo, abbreviation, division, conference ),
        away_team:nfl_team!nfl_game_today_away_team_id_fkey ( short_display_name, display_name, logo, abbreviation, division, conference )
        `).eq('id', +nflGameID!).limit(1).single()

    if (error) {
        console.log(`Error getting stream: ${error.message}`)
    }

    return {
        nflGameToday
    };
}