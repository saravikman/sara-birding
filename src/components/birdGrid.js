'use client';

import { useState } from 'react';
import { XIcon } from './icons/XIcon';
import { StarIcon } from './icons/star';
import { CheckIcon } from './icons/check';
import { motion, AnimatePresence } from 'framer-motion';

export default function BirdGrid({ birds }) {
  const [filter, setFilter] = useState('ALL');
  const [selectedBird, setSelectedBird] = useState(null);

  const filteredBirds = filter === 'ALL' ? birds : birds.filter((b) => b.filter === filter);

  const filters = [
    { value: 'ALL', content: <span className="text-xs">All</span> },
    { value: 'Star', content: <StarIcon className="w-3 h-3 md:w-4 md:h-4" /> },
    { value: 'Check', content: <CheckIcon className="w-3 h-3 md:w-4 md:h-4" /> },
    { value: 'nf', content: <XIcon className="w-2.5 h-2.5 md:w-4 md:h-4" /> },
  ];

  const [isVertical, setIsVertical] = useState(false);

  return (
    <>
      <div className="w-full max-w-6xl mx-auto p-2 mt-5 md:p-4 md:mt-10 flex justify-between items-center">
        <ul className="flex gap-2 mx-auto md:mx-0">
          {filters.map(({ value, content }) => (
            <li
              key={value}
              onClick={() => setFilter(value)}
              className={`w-8 h-8 flex items-center justify-center border rounded-md cursor-pointer transition font-display uppercase
                ${
                  filter === value
                    ? 'bg-black text-white'
                    : 'border-neutral-300 hover:bg-neutral-100'
                }
            `}
            >
              {content}
            </li>
          ))}
        </ul>
      </div>

      {/* GRID */}
      <div className="px-4 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6 max-w-6xl w-full mx-auto">
        {filteredBirds.map((bird) => {
          const imageUrl = bird.photo;

          return (
            <div
              key={bird.slug || bird.name}
              onClick={() => {
                if (!bird.found) return;
                setSelectedBird(bird);
              }}
              className={`relative w-full aspect-square rounded-lg overflow-hidden bg-neutral-200 transition
                ${bird.found && 'cursor-pointer'}
                `}
              style={
                imageUrl
                  ? {
                      backgroundImage: `url(${imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }
                  : {}
              }
            >
              {imageUrl && (
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 from-5% via-black/0 to-black/0" />
              )}

              <div
                className={`w-full absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center tracking-widest ${
                  imageUrl ? 'text-white' : 'text-gray-800'
                }`}
              >
                <p className="font-display text-sm md:text-base uppercase font-medium">
                  {bird.name}
                </p>
                <p className="font-display text-[10px] md:text-xs uppercase opacity-90">
                  {bird.latinName}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedBird && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedBird(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            <motion.div
              className="overflow-hidden relative bg-light flex flex-col-reverse md:flex-row rounded-lg shadow-xl"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 10 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            >
              <div className=" p-10 flex flex-col justify-between gap-2 w-full text-black">
                <div>
                  <p className="font-display text-3xl md:text-4xl uppercase">{selectedBird.name}</p>
                  <p className="font-display text-base uppercase opacity-60">
                    {selectedBird.latinName}
                  </p>
                </div>
                <div className="border-t border-neutral-300 pt-4">
                  <p className="font-display uppercase">Kategori: {selectedBird.category}</p>
                  <p className="font-display uppercase">Plats: {selectedBird.photoPlace}</p>
                  <p className="font-display uppercase">Datum: {selectedBird.photoDate}</p>
                </div>
              </div>
              {selectedBird.photo && (
                <img
                  src={selectedBird.photo}
                  alt={selectedBird.name}
                  onLoad={(e) => {
                    const img = e.currentTarget;
                    setIsVertical(img.naturalHeight > img.naturalWidth);
                  }}
                  className={`w-full ${
                    isVertical
                      ? 'max-h-[70vh] md:max-h-[90vh] object-contain'
                      : 'max-h-[90vh] md:h-[80vh] object-cover'
                  }`}
                />
              )}

              {/* CLOSE BUTTON */}
              <button
                onClick={() => setSelectedBird(null)}
                className="absolute top-2 right-4 text-white text-xl"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
