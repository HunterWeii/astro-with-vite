import './index.scss';

interface ContentProps {
    children ?: React.ReactNode
}

export default function Content(props: ContentProps) {
	return (
		<section className='astro-content'>
			{props.children}
		</section>
	)
}