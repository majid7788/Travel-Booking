import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface FavoritesContextType {
  favoriteHotels: number[];
  favoriteDestinations: number[];

  toggleHotelFavorite: (
    hotelId: number
  ) => void;

  toggleDestinationFavorite: (
    destinationId: number
  ) => void;

  isHotelFavorite: (
    hotelId: number
  ) => boolean;

  isDestinationFavorite: (
    destinationId: number
  ) => boolean;
}

const FavoritesContext =
  createContext<
    FavoritesContextType | undefined
  >(undefined);

interface FavoritesProviderProps {
  children: ReactNode;
}

export function FavoritesProvider({
  children,
}: FavoritesProviderProps) {
  const [favoriteHotels, setFavoriteHotels] =
    useState<number[]>(() => {
      const stored =
        localStorage.getItem(
          "favoriteHotels"
        );

      if (!stored) {
        return [];
      }

      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    });

  const [
    favoriteDestinations,
    setFavoriteDestinations,
  ] = useState<number[]>(() => {
    const stored =
      localStorage.getItem(
        "favoriteDestinations"
      );

    if (!stored) {
      return [];
    }

    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "favoriteHotels",
      JSON.stringify(favoriteHotels)
    );
  }, [favoriteHotels]);

  useEffect(() => {
    localStorage.setItem(
      "favoriteDestinations",
      JSON.stringify(
        favoriteDestinations
      )
    );
  }, [favoriteDestinations]);

  const toggleHotelFavorite = (
    hotelId: number
  ) => {
    setFavoriteHotels((current) => {
      if (current.includes(hotelId)) {
        return current.filter(
          (id) => id !== hotelId
        );
      }

      return [...current, hotelId];
    });
  };

  const toggleDestinationFavorite = (
    destinationId: number
  ) => {
    setFavoriteDestinations(
      (current) => {
        if (
          current.includes(
            destinationId
          )
        ) {
          return current.filter(
            (id) =>
              id !== destinationId
          );
        }

        return [
          ...current,
          destinationId,
        ];
      }
    );
  };

  const isHotelFavorite = (
    hotelId: number
  ) => {
    return favoriteHotels.includes(
      hotelId
    );
  };

  const isDestinationFavorite = (
    destinationId: number
  ) => {
    return favoriteDestinations.includes(
      destinationId
    );
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoriteHotels,
        favoriteDestinations,
        toggleHotelFavorite,
        toggleDestinationFavorite,
        isHotelFavorite,
        isDestinationFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context =
    useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      "useFavorites must be used inside FavoritesProvider"
    );
  }

  return context;
}