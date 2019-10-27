// @flow
import { useEffect } from 'react';
import type { Node } from 'react';
import OpenPlayerJS from 'openplayerjs';
import 'openplayerjs/dist/openplayer.css';

type PlayerOptions = {
    id: string,
    ended: boolean,
    fullscreen: boolean,
    currentSpeed: string,
    poster?: string,
    ads?: string | Array<string>,
    children: Node,
    options: Object,
    toggleCaptions: Function,
    toggleSpeed: Function,
    onEnded: Function,
    onCaptionsChanged: Function,
    onDestroy: Function,
};

function OpenPlayer(props: PlayerOptions) {
    const {
        id, ads, fullscreen, options,
    } = props;

    // Setup player
    useEffect(() => {
        async function setup() {
            const player = new OpenPlayerJS(id, ads, fullscreen, options);
            await player.init();
        };

        setup();

        return () => {
            props.onDestroy();
            OpenPlayer.instances[props.id].destroy();
        }
    }, [setup]);

    return (
        <video id={id} className='op-player__media' controls autoPlay playsInline
            poster={props.poster}
            onEnded={props.onEnded}
            crossOrigin='anonymous'
        >
            {props.children}
        </video>
    );
}

OpenPlayer.defaultProps = {
    fullscreen: false,
    currentSpeed: '',
    options: {},
    toggleCaptions: () => { },
    toggleSpeed: () => { },
    onCaptionsChanged: () => { },
    onEnded: () => { },
    onDestroy: () => { },
};

export default OpenPlayer;