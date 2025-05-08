import React, { useState, useEffect } from "react";
import axios from "axios";
import Deal from "../../types/Deal";
import Store from "../../types/Store";

interface DashboardContextType {
    deals: Deal[];
    stores: Store[];
    dealsWithStoreName: Deal[];
    setDealsWithStoreName: React.Dispatch<React.SetStateAction<Deal[]>>;
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    storeID: string;
    setStoreID: React.Dispatch<React.SetStateAction<string>>;
    priceRange: number[];
    setPriceRange: React.Dispatch<React.SetStateAction<number[]>>;
    sortBy: string;
    setSortBy: React.Dispatch<React.SetStateAction<string>>;
    selectedDeal: Deal | null;
    isSelectedDealInLocalStorage: boolean;
    showModal: boolean;
    showFavoritesModal: boolean;
    setShowFavoritesModal: React.Dispatch<React.SetStateAction<boolean>>;
    loading: boolean;
    viewMode: 'grid' | 'list';
    setViewMode: React.Dispatch<React.SetStateAction<'grid' | 'list'>>;
    openMobileMenu: boolean;
    setOpenMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
    favorites: Deal[];
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    setIsPagingUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    handleToggleFavorite: (item: Deal) => void;
    handleSelectDeal: (deal: Deal) => void;
    handleOpenFavoritesModal: () => void;
    handleopenDetailsModal: (deal: Deal) => void;
    handleCloeDetailsModal: () => void;
    Columns: string[];
    handleFetchStores: () => Promise<void>;
    handleFetchDeals: () => Promise<void>;
}

const DashboardContext = React.createContext<DashboardContextType | undefined>(
  undefined
);
DashboardContext.displayName = "Context for Dashboard";

interface DashboardProviderType {
  children: React.ReactNode;
}

export function DashboardProvider({ children }: DashboardProviderType) {
    const [deals, setDeals] = useState<Deal[]>([]);
    const [stores, setStores] = useState<Store[]>([])
    const [dealsWithStoreName, setDealsWithStoreName] = useState<Deal[]>([])
    const [search, setSearch] = useState('');
    const [storeID, setStoreID] = useState('');
    const [priceRange, setPriceRange] = useState([0, 60]);
    const [sortBy, setSortBy] = useState('Price');
    const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
    const [isSelectedDealInLocalStorage, setIsSelectedDealInLocalStorage] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showFavoritesModal, setShowFavoritesModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
    const [openMobileMenu, setOpenMobileMenu] = useState(false);
    const [favorites, setFavorites] = useState<Deal[]>([]);
  
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [isPagingUpdate, setIsPagingUpdate] = useState(false);

    const Columns = ['Game', 'New Price', 'Previous price', 'Saving', 'Store', 'Rating'];
    const pageSize = 6;

    useEffect(() => {
    const storeMap = new Map<string, string>()
    stores.forEach(store => {
        storeMap.set(store.storeID, store.storeName)
    })
    
    const dealsWithStoreName = deals.map(deal => ({
        ...deal,
        storeName: storeMap.get(deal.storeID) || 'Unknown Store'
    }))
    
    console.log(dealsWithStoreName)
    setDealsWithStoreName(dealsWithStoreName)
    },[deals, stores])
    
    const handleFetchStores = async () => {
    try {
        const res = await axios.get('https://www.cheapshark.com/api/1.0/stores')
        setStores(res.data)
    } catch (error) {
        console.error('Erro ao buscar lojas:', error)
    } finally {
        setLoading(false)
    }
    }
    
    const handleFetchDeals = async () => {
    setLoading(true);
    !isPagingUpdate && setCurrentPage(0);

    const params: any = {
        pageSize,
        pageNumber: currentPage,
    };

    if (search) params.title = search;
    if (storeID) params.storeID = storeID;
    if (priceRange[0] > 0) params.lowerPrice = priceRange[0];
    if (priceRange[1] > 0) params.upperPrice = priceRange[1];
    if (sortBy) params.sortBy = sortBy.replace(/ /g, '').toLowerCase();

    try {
        const res = await axios.get('https://www.cheapshark.com/api/1.0/deals', { params });
        setDeals(res.data);
        
    } catch (error) {
        console.error('Erro ao buscar deals:', error);
    } finally {
        setIsPagingUpdate(false);
        setLoading(false);
    }
    };
      
    const handleSelectDeal = (deal: Deal) => {
    setSelectedDeal(deal);
    isItemInLocalStorage(deal.dealID);
    setShowModal(true);
    };
      
    const handleToggleFavorite = (item: Deal) => {
    const key = 'favorites';
    let favorites: Deal[] = [];
    
    try {
        const stored = localStorage.getItem(key);
        if (stored) {
        const parsed = JSON.parse(stored);
        
        if (Array.isArray(parsed)) {
            favorites = parsed;
        }
        }
    
        const exists = favorites.some(fav => fav.dealID === item.dealID);
        const updatedFavorites = exists
        ? favorites.filter(fav => fav.dealID !== item.dealID)
        : [...favorites, item];
    
        localStorage.setItem(key, JSON.stringify(updatedFavorites));
        isItemInLocalStorage(item.dealID, key);
    } catch (error) {
        console.error('LocalStorage access error:', error);
    }
    }
    
    const isItemInLocalStorage = (id: string, key: string = 'favorites'): void => {
    try {
        const stored = localStorage.getItem(key);
        if (!stored) setIsSelectedDealInLocalStorage(false);
    
        const parsed = JSON.parse(stored || '[]');
        if (!Array.isArray(parsed)) setIsSelectedDealInLocalStorage(false);
    
        setIsSelectedDealInLocalStorage(parsed.some((item: Deal) => item.dealID === id))
    } catch (error) {
        console.error('Error:', error);
    }
    }

    const getFavorites = (): void => {
    const stored = localStorage.getItem("favorites");

    if (!stored) return;

    try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
        setFavorites(parsed);
        }
    } catch (e) {
        console.error("Erro ao ler favoritos:", e);
    }
    }

    const handleOpenFavoritesModal = () => {
    getFavorites();
    setShowFavoritesModal(true);
    }
    
    const handleopenDetailsModal = (deal: Deal): void => {
    setSelectedDeal(deal);
    isItemInLocalStorage(deal?.dealID || '');
    setShowModal(true);
    }

    const handleCloeDetailsModal = () => {
    getFavorites();
    setSelectedDeal(null);
    setShowModal(false);
    setIsSelectedDealInLocalStorage(false);
    }

  return (
    <DashboardContext.Provider
      value={{
        deals,
        stores,
        dealsWithStoreName,
        setDealsWithStoreName,
        search,
        setSearch,
        storeID,
        setStoreID,
        priceRange,
        setPriceRange,
        sortBy,
        setSortBy,
        selectedDeal,
        isSelectedDealInLocalStorage,
        showModal,
        showFavoritesModal,
        setShowFavoritesModal,
        loading,
        viewMode,
        setViewMode,
        openMobileMenu,
        setOpenMobileMenu,
        favorites,
        currentPage,
        setCurrentPage,
        setIsPagingUpdate,
        handleToggleFavorite,
        handleOpenFavoritesModal,
        handleopenDetailsModal,
        handleCloeDetailsModal,
        Columns,
        handleSelectDeal,
        handleFetchStores,
        handleFetchDeals,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard(): DashboardContextType {
  const context = React.useContext(DashboardContext);

  if (!context)
    throw new Error("useDashboard must be used within an AuthProvider");

  return context;
}