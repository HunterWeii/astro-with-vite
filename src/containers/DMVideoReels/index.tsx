import { useEffect, useRef, useState } from "react"
import './index.scss';

function generateCustomButton() {
	const div = document.createElement('div');
	div.className = 'dm-player-button';
	div.id = 'dm-player-custom-button';

	const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
	svg.setAttribute('viewBox', '0 0 24 24');

	const path = document.createElementNS('http://www.w3.org/2000/svg','path');
	path.setAttribute('fill', 'currentColor');
	path.setAttribute('d', 'M8 5v14l11-7z');

	svg.appendChild(path);
	div.appendChild(svg);

	return div;
}

export default function DMVideoReels() {
	const [scriptLoaded, setScriptLoaded] = useState(false);
	const dmPlayerRef = useRef(null);

	useEffect(() => {
		if(!scriptLoaded) return;
		if(!dmPlayerRef.current) return;

		const onDMStoryEnterFullscreen = () => {
			const playerButton = generateCustomButton();
			const dmPlayerControlWrapper = dmPlayerRef.current?.querySelector('.dm-player-control-wrapper');

			if (dmPlayerControlWrapper) {
				dmPlayerControlWrapper.appendChild(playerButton);
			}
		};

		const onDMStoryExitFullscreen = () => {
			const dmPlayerControlWrapper = dmPlayerRef.current?.querySelector('.dm-player-control-wrapper');
			if (dmPlayerControlWrapper) {
				const customPlayerButton = dmPlayerControlWrapper.querySelector('#dm-player-custom-button');
				dmPlayerControlWrapper.removeChild(customPlayerButton);
			}
		};

		document.addEventListener('dm-story-enter-fullscreen', onDMStoryEnterFullscreen);
		document.addEventListener('dm-story-exit-fullscreen', onDMStoryExitFullscreen);

		return () => {
			document.removeEventListener('dm-story-enter-fullscreen', onDMStoryEnterFullscreen);
			document.removeEventListener('dm-story-exit-fullscreen', onDMStoryExitFullscreen);
		}

	}, [scriptLoaded]);
	
	useEffect(() => {
		try {
			const playerId = 'xa0yv';
			const existingScript = document.querySelector(`script#${playerId}`);

			if (existingScript) return;

			const scriptSrc = 'https://srvr.dmvs-apac.com/dm-story/dm-story.min.js';
			const script = document.createElement('script');

			script.id = playerId;
			script.src = scriptSrc;
			script.type = 'text/javascript';
			//script.async = true;

			script.addEventListener('load', () => {
				console.log('script load success');
				setScriptLoaded(true);
			});
			script.addEventListener('error', () => console.log('script load failed'));

			document.body.appendChild(script);
		} catch (error) {
			console.log(error);
		}
	}, []);
		
	return (
		<div>
			<div
				id="dm-story"
				className="dm-story"
				playlistid="x7sgmx"
				playerid="xa0yv"
				numofvideos={20}
				ref={dmPlayerRef}
			>
			</div>
		</div>
	)
}