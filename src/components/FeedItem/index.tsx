import './index.scss';

interface FeedItemProps {
  title: string,
  description: string,
  dateTime: string | number,
  imgURL: string
}

export default function FeedItem(props: FeedItemProps) {
  return (
    <div className='feed-item'>
      <div className='feed-item__imgplaceholder'>
        { props.imgURL ? <img className='feed-item__img' alt="test" src={props.imgURL} /> : null }
      </div>
      <div className='feed-item__content'>
        <h2>{ props.title }</h2>
        <p>{ props.description }</p>
        <span>{ props.dateTime }</span>
      </div>
    </div>
  )
}