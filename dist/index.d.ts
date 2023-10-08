declare namespace API {
    type SuccessfulAPIResponse<T> = {
        success: true;
        data: T;
    };
    type ErroredAPIResponse = {
        success: false;
        error: {
            message: string;
            code: string;
        };
    };
}
type Options = {
    /**
     * The Base URL of Lanyard's API. Defaults to `https://api.lanyard.rest`
     */
    api: {
        hostname: string;
        secure?: boolean;
    };
    /**
     * Initial data to use. Useful if server side rendering.
     */
    initialData?: Data;
};
declare const DEFAULT_OPTIONS: Options;
type Snowflake = `${bigint}`;
type LanyardResponse = API.SuccessfulAPIResponse<Data> | API.ErroredAPIResponse;
interface Data {
    spotify: Spotify | null;
    kv: Record<string, string>;
    listening_to_spotify: boolean;
    discord_user: DiscordUser;
    discord_status: 'online' | 'idle' | 'dnd' | 'offline';
    activities: Activity[];
    active_on_discord_web: boolean;
    active_on_discord_mobile: boolean;
    active_on_discord_desktop: boolean;
}
interface Spotify {
    track_id: string | null;
    timestamps: Timestamps;
    song: string;
    artist: string;
    album_art_url: string | null;
    album: string;
}
interface Timestamps {
    start: number;
    end: number;
}
interface DiscordUser {
    username: string;
    public_flags: number;
    id: Snowflake;
    global_name: string | null;
    /**
     * @deprecated Use global_name instead.
     */
    display_name: string | null;
    discriminator: string;
    bot: boolean;
    avatar_decoration: string | null;
    avatar: string | null;
}
interface Activity {
    type: number;
    state: string;
    name: string;
    id: string;
    emoji?: Emoji;
    created_at: number;
    timestamps?: Timestamps;
    sync_id?: string;
    session_id?: string;
    party?: Party;
    flags?: number;
    details?: string;
    assets?: Assets;
    application_id?: Snowflake;
}
interface Emoji {
    name: string;
    id: Snowflake;
    animated: boolean;
}
interface Party {
    size: [number, number];
    id: string;
}
interface Assets {
    small_text: string;
    small_image: string;
    large_text: string;
    large_image: string;
}

type ContextData = {
    state: 'initial';
    isLoading: boolean;
    error: undefined;
    data: Data | undefined;
} | {
    state: 'loaded';
    isLoading: boolean;
    data: Data;
    error: LanyardError | undefined;
} | {
    state: 'errored';
    isLoading: boolean;
    data: Data | undefined;
    error: LanyardError | undefined;
};

type UseLanyardReturn = ContextData & {
    revalidate(): Promise<void>;
};
declare class LanyardError extends Error {
    readonly request: Request;
    readonly response: Response;
    readonly body: API.ErroredAPIResponse;
    readonly code: number;
    constructor(request: Request, response: Response, body: API.ErroredAPIResponse);
}
declare function useLanyard(snowflake: Snowflake, _options?: Partial<Options>): UseLanyardReturn;

declare enum SocketOpcode {
    Event = 0,
    Hello = 1,
    Initialize = 2,
    Heartbeat = 3
}
declare enum SocketEvents {
    INIT_STATE = "INIT_STATE",
    PRESENCE_UPDATE = "PRESENCE_UPDATE"
}
interface SocketData extends Data {
    heartbeat_interval?: number;
}
interface SocketMessage {
    op: SocketOpcode;
    t?: SocketEvents;
    d?: SocketData;
}
declare function useLanyardWS(snowflake: Snowflake | Snowflake[], _options?: Partial<Options>): Data | undefined;

interface GetOptions extends Options {
    controller?: AbortController;
}
declare function getURL(snowflake: Snowflake, options: Options): `https://${string}/v1/users/${bigint}` | `http://${string}/v1/users/${bigint}`;
declare function get(url: ReturnType<typeof getURL>, options: GetOptions): Promise<{
    success: false;
    error: LanyardError;
    data?: never;
} | {
    success: true;
    data: Data;
    error?: never;
}>;

export { API, Activity, Assets, DEFAULT_OPTIONS, Data, DiscordUser, Emoji, GetOptions, LanyardError, LanyardResponse, Options, Party, Snowflake, SocketData, SocketEvents, SocketMessage, SocketOpcode, Spotify, Timestamps, UseLanyardReturn, get, getURL, useLanyard, useLanyardWS };
