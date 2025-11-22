const Card = ({ header, data = [], footer }) => (
  <div className="card">
    {header && <div className="order_header">{header}</div>}
    <div className="order_contents">
      <dl className="order_info">
      {data.map(({ term, description }) => (
        <div key={term} className="info_group">
          <dt className="type">{term}</dt>
          <dd className="value" >{description}</dd>
        </div>
      ))}
      </dl>
    </div>
    {footer && <div className="order_footer">{footer}</div>}
  </div>
);

export default Card;
