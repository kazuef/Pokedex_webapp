import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function SearchBar({ onSearch, placeholder = '検索...' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="relative max-w-xl w-full mx-auto"
    >
      <div className={`
        relative flex items-center transition-all duration-300
        ${isFocused 
          ? 'bg-white shadow-lg ring-2 ring-blue-500' 
          : 'bg-gray-50 shadow-md hover:shadow-lg'
        }
        rounded-full
      `}>
        <Search 
          className={`
            w-5 h-5 ml-4 transition-colors duration-300
            ${isFocused ? 'text-blue-500' : 'text-gray-400'}
          `}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="
            w-full px-4 py-3 text-gray-700 bg-transparent
            placeholder-gray-400 focus:outline-none
          "
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="
              p-2 mr-2 text-gray-400 hover:text-gray-600
              transition-colors duration-200
            "
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </form>
  );
}