const OrderCard = ({ order }) => {
  return (
    <article
      className={`bg-white border rounded-xl overflow-hidden shadow-sm flex flex-col ${order.border}`}
    >
      <div
        className={`p-4 border-b-4 flex justify-between items-start ${order.headerBg}`}
      >
        <div>
          <span className="text-xs font-bold uppercase tracking-widest">
            Table
          </span>
          <h3 className="text-2xl font-bold">{order.table}</h3>
        </div>

        <div className="text-right">
          <p className="text-sm">{order.timeAgo}</p>
          <p className="font-bold">{order.time}</p>
        </div>
      </div>

      <div className="p-4 flex-1">
        <ul className="space-y-2">
          {order.items.map((item, index) => (
            <li key={index} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center text-xs font-bold">
                  {item.qty}
                </span>
                <span className="font-medium">{item.name}</span>
              </div>
              {item.note && (
                <span className="text-sm text-gray-500">{item.note}</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 border-t bg-gray-50">
        <button
          className={`w-full py-3 rounded-lg font-bold text-white ${order.buttonColor}`}
        >
          {order.action}
        </button>
      </div>
    </article>
  );
};

export default OrderCard;
