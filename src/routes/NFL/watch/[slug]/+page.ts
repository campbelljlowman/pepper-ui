import type { Load } from "@sveltejs/kit"

export const load: Load = async ({ params, parent }) => {
    const nfl_game_id = params.slug
    const { supabase } = await parent()

    if (nfl_game_id === undefined || isNaN(+nfl_game_id!) ){
        console.log("Invalid game strem ID")
        return {
            nfl_game_today: null
        }
    }

    const { data: nfl_game_today, error } = await supabase.from('nfl_game_today').select(`
        id,
        title,
        start_time,
        view_price_dollars,
        stream_link:stream_link ( stream_link, title ),
        home_team:nfl_team!nfl_game_today_home_team_id_fkey ( short_display_name, display_name, logo, abbreviation, division, conference ),
        away_team:nfl_team!nfl_game_today_away_team_id_fkey ( short_display_name, display_name, logo, abbreviation, division, conference )
        `).eq('id', +nfl_game_id!).limit(1).single()

    if (error) {
        console.log(`Error getting stream: ${error.message}`)
    }

    return {
        nfl_game_today
    };
}