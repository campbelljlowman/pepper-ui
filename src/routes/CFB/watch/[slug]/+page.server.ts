export const load = async ({ params, locals: { supabase } }) => {
    const cfb_game_id = params.slug

    if (cfb_game_id === undefined || isNaN(+cfb_game_id!) ){
        console.log("Invalid game strem ID")
        return {
            cfb_game_today: null
        }
    }

    const { data: cfb_game_today, error } = await supabase.from('cfb_game_today').select(`
        id,
        title,
        start_time,
        view_price_dollars,
        stream_link:stream_link ( stream_link, title ),
        home_team:cfb_team!cfb_game_today_home_team_id_fkey ( short_display_name, display_name, logo, abbreviation, conference ),
        away_team:cfb_team!cfb_game_today_away_team_id_fkey ( short_display_name, display_name, logo, abbreviation, conference )
        `).eq('id', +cfb_game_id!).limit(1).single()

    if (error) {
        console.log(`Error getting stream: ${error.message}`)
    }

    return {
        cfb_game_today
    };
}