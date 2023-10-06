import type { Load } from "@sveltejs/kit"
import { supabase } from "$lib/supabaseClient";


export const load: Load = async ({ params }) => {
    const game_stream_id = params.slug

    if (game_stream_id === undefined || isNaN(+game_stream_id!) ){
        return {
            game_stream: null
        }
    }

    const { data, error } = await supabase.from('game_stream').select().eq('id', +game_stream_id!).limit(1).single()

    if (error) {
        console.log(`Error getting stream: ${error}`)
    }

    return {
        game_stream: data
    };
}