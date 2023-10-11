import type { Load } from "@sveltejs/kit"
// import { supabase } from "$lib/supabaseClient";


export const load: Load = async ({ params }) => {
    const game_stream_id = params.slug

    if (game_stream_id === undefined || isNaN(+game_stream_id!) ){
        return {
            game_stream_id: null
        }
    }

    return {
        game_stream_id
    };
}