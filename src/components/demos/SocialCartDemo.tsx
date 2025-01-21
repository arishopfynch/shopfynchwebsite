import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Share2, ArrowLeft, Plus, Minus, MessageSquare } from 'lucide-react';

const initialItems = [
  {
    id: 1,
    name: "Vintage Denim Jacket",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=300",
    quantity: 1,
    votes: { up: 8, down: 2 },
    comments: [
      {
        id: 1,
        text: "Not a fan of the Jacket..",
        author: "Sarah",
        timestamp: new Date().toISOString()
      }
    ]
  },
  {
    id: 2,
    name: "Classic White Sneakers",
    price: 64.99,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300",
    quantity: 1,
    votes: { up: 12, down: 1 },
    comments: [
      {
        id: 1,
        text: "love the shoes!!",
        author: "Mike",
        timestamp: new Date().toISOString()
      },
      {
        id: 2,
        text: "How have I never heard of this brand before?!",
        author: "Alex",
        timestamp: new Date().toISOString()
      }
    ]
  },
];

export default function SocialCartDemo() {
  const [isSharedView, setIsSharedView] = useState(false);
  const [items, setItems] = useState(initialItems);

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const updateQuantity = (id: number, delta: number) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const updateVotes = (id: number, type: 'up' | 'down') => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? {
              ...item,
              votes: {
                ...item.votes,
                [type]: item.votes[type] + 1
              }
            }
          : item
      )
    );
  };

  const RegularCartView = () => (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg font-medium text-[#351431]">My Cart</h3>
        <button
          onClick={() => setIsSharedView(true)}
          className="share-button flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base bg-gradient-to-r from-[#008080] to-[#006666] text-white font-medium shadow-lg shadow-[#008080]/20 hover:shadow-[#008080]/30 hover:scale-105 transition-all duration-300"
        >
          <Share2 className="h-4 w-4" />
          <span>Can't Decide? Ask your Friends!</span>
        </button>
      </div>

      <div className="flex-1 space-y-2 sm:space-y-3 overflow-y-auto">
        {items.map((item) => (
          <div 
            key={item.id} 
            className="group bg-white rounded-lg p-2.5 sm:p-3 border border-gray-100 hover:border-[#008080]/30 transition-all duration-300"
          >
            <div className="flex gap-2 sm:gap-3">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg"
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-sm sm:text-base text-[#351431] truncate pr-2">{item.name}</h4>
                  <p className="text-[#008080] font-medium text-sm sm:text-base">${item.price}</p>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1 sm:gap-2 bg-gray-50 rounded-lg p-1">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1 hover:bg-gray-200 rounded transition-colors"
                    >
                      <Minus className="h-3 w-3 text-gray-600" />
                    </button>
                    <span className="text-xs sm:text-sm font-medium w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1 hover:bg-gray-200 rounded transition-colors"
                    >
                      <Plus className="h-3 w-3 text-gray-600" />
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 sm:mt-4 bg-[#E9FFF9] p-3 sm:p-4 rounded-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <p className="text-xs sm:text-sm text-gray-600">Total</p>
            <p className="text-lg sm:text-xl font-bold text-[#351431]">${total.toFixed(2)}</p>
          </div>
          <button className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 bg-[#008080] text-white rounded-lg hover:bg-[#006666] transition-colors text-sm font-medium">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );

  const SharedCartView = () => (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <button
          onClick={() => setIsSharedView(false)}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-hover:text-gray-600" />
        </button>
        <div>
          <h3 className="text-base sm:text-lg font-medium text-[#351431]">Shared Cart</h3>
          <p className="text-xs sm:text-sm text-gray-500">Help them decide what to buy</p>
        </div>
      </div>

      <div className="flex-1 space-y-2 sm:space-y-3 overflow-y-auto">
        {items.map((item) => (
          <div 
            key={item.id} 
            className="group bg-white rounded-lg p-2.5 sm:p-3 border border-gray-100 hover:border-[#008080]/30 transition-all duration-300"
          >
            <div className="flex gap-2 sm:gap-3">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg"
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-sm sm:text-base text-[#351431] truncate pr-2">{item.name}</h4>
                  <p className="text-[#008080] font-medium text-sm sm:text-base">${item.price}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button 
                    onClick={() => updateVotes(item.id, 'up')}
                    className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-green-50 text-green-600 hover:bg-green-100 transition-colors text-xs sm:text-sm"
                  >
                    <ThumbsUp className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    <span>{item.votes.up}</span>
                  </button>
                  <button 
                    onClick={() => updateVotes(item.id, 'down')}
                    className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors text-xs sm:text-sm"
                  >
                    <ThumbsDown className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    <span>{item.votes.down}</span>
                  </button>
                  <span className="text-xs sm:text-sm text-gray-400">
                    Qty: {item.quantity}
                  </span>
                </div>
                {/* Comments Section */}
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MessageSquare className="h-4 w-4" />
                    <span className="text-sm font-medium">Comments</span>
                  </div>
                  <div className="space-y-2">
                    {item.comments.map((comment) => (
                      <div key={comment.id} className="bg-gray-50 rounded-lg p-2 text-sm">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-[#008080]">{comment.author}</span>
                          <span className="text-xs text-gray-500">
                            {new Date(comment.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-600">{comment.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 sm:mt-4 bg-[#E9FFF9] p-3 sm:p-4 rounded-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <p className="text-xs sm:text-sm text-gray-600">Cart Total</p>
            <p className="text-lg sm:text-xl font-bold text-[#351431]">${total.toFixed(2)}</p>
          </div>
          <button className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 bg-[#008080] text-white rounded-lg hover:bg-[#006666] transition-colors text-sm font-medium">
            Buy for Friend
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full bg-gray-50/50 rounded-lg p-2.5 sm:p-4">
      {isSharedView ? <SharedCartView /> : <RegularCartView />}
    </div>
  );
}