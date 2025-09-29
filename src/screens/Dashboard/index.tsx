import { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from '../../components/DataTable';
import Deal from '../../types/Deal';
import Modal from '../../components/GameModal';

import { HeartMinus, HeartPlus, LayoutGrid, Menu, Table } from 'lucide-react'
import FilterSidebar from '../../components/FilterSidebar';
import GridView from './gridView';
import Store from '../../types/Store';
import { Button } from '../../components/Button';
import { useDashboard } from '../Providers/dashboard';

export default function GameDealsDashboard() {
  const {
    stores,
    dealsWithStoreName,
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
    Columns,
    handleFetchStores,
    handleSelectDeal,
    handleToggleFavorite,
    handleOpenFavoritesModal,
    handleopenDetailsModal,
    handleCloeDetailsModal
  } = useDashboard();

  useEffect(() => {
    handleFetchStores()
  }, [])  

  return (
    <div className="flex flex-col w-full min-h-screen mx-auto bg-gray-50">
  {/* Navbar */}
  <div className="flex items-center justify-between px-6 h-16 bg-blue-500/90 backdrop-blur-md shadow-md">
    <h1 className="text-2xl font-bold text-white">Game Deals</h1>
    <p className="hidden md:flex text-blue-100">Thousands of deals</p>
    <Menu
      onClick={() => setOpenMobileMenu(true)}
      className="md:hidden cursor-pointer"
      size={28}
      color="white"
    />
  </div>

  <div className="flex flex-row w-full">
    {/* Sidebar */}
    <FilterSidebar
      search={search}
      setSearch={setSearch}
      priceRange={priceRange}
      setPriceRange={setPriceRange}
      storeID={storeID}
      setStoreID={setStoreID}
      sortBy={sortBy}
      setSortBy={setSortBy}
      stores={stores}
      openMobileMenu={openMobileMenu}
      setOpenMobileMenu={setOpenMobileMenu}
      setOpenFavoritesModal={handleOpenFavoritesModal}
    />

    {/* Main content */}
    <div className="flex flex-col w-full md:w-4/5 md:px-6 py-4">
      {/* Header body */}
      <div className="flex flex-col md:flex-row w-full items-center justify-center md:justify-between text-center md:text-left font-semibold text-blue-600 mb-4">
        <div className="md:w-2/3">
          <p>
            Welcome! We're glad to have you here. Explore and enjoy the best
            deals just for you!
          </p>
        </div>

        {/* View switcher */}
        <div className="flex flex-row md:w-1/3 items-center justify-end mt-3 md:mt-0 space-x-3">
          <p className="text-gray-500 text-sm">View as:</p>

          <button
            onClick={() => setViewMode("list")}
            className={`flex items-center transition ${
              viewMode === "list" ? "opacity-100" : "opacity-40"
            }`}
            title="List"
          >
            <Table size={20} color="blue" />
          </button>

          <button
            onClick={() => setViewMode("grid")}
            className={`flex items-center transition ${
              viewMode === "grid" ? "opacity-100" : "opacity-40"
            }`}
            title="Grid"
          >
            <LayoutGrid size={20} color="blue" />
          </button>
        </div>
      </div>

      {/* Grid or Table */}
      {viewMode === "grid" ? (
        <GridView
          Columns={Columns}
          deals={dealsWithStoreName}
          loading={loading}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          handleSelectDeal={handleSelectDeal}
          setIsPagingUpdate={setIsPagingUpdate}
        />
      ) : (
        <DataTable
          Columns={Columns}
          deals={dealsWithStoreName}
          loading={loading}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setIsPagingUpdate={setIsPagingUpdate}
        >
          {dealsWithStoreName.map((deal) => (
            <tr
              key={deal.dealID}
              onClick={() => handleSelectDeal(deal)}
              className="hover:bg-blue-50 transition cursor-pointer"
            >
              <td className="p-2 border flex items-center gap-3 w-auto whitespace-nowrap overflow-hidden">
                <img
                  src={deal.thumb}
                  alt={deal.title}
                  className="w-14 h-14 rounded shadow-sm"
                />
                <span className="truncate">{deal.title}</span>
              </td>
              <td className="p-2 border text-green-600">${deal.salePrice}</td>
              <td className="p-2 border line-through text-gray-500">
                ${deal.normalPrice}
              </td>
              <td className="p-2 border text-red-600">
                {parseInt(deal.savings)}%
              </td>
              <td className="p-2 border">{deal.storeName}</td>
              <td className="p-2 border text-blue-600">{deal.dealRating}</td>
            </tr>
          ))}
        </DataTable>
      )}
    </div>
  </div>

  {/* Modal favorites */}
<Modal
  isOpen={showFavoritesModal}
  onClose={() => setShowFavoritesModal(false)}
  title="Your Favorite Deals"
>
  <div className="flex flex-col w-full px-6 space-y-4">
    {favorites.length === 0 ? (
      <div className="flex flex-col items-center justify-center text-center py-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-gray-400 mb-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 21l-1.45-1.318C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 
            3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 
            3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 
            6.86-8.55 11.182L12 21z"
          />
        </svg>
        <p className="text-gray-500">No favorites yet. Start adding some deals!</p>
      </div>
    ) : (
      <ul className="space-y-2 max-h-80 overflow-y-auto pr-2">
        {favorites.map((favorite, index) => (
          <li
            key={index}
            className="p-3 border rounded-lg hover:bg-blue-50 transition cursor-pointer"
            onClick={() => handleopenDetailsModal(favorite)}
          >
            <p className="text-blue-700 font-medium break-words">
              {favorite?.title}
            </p>
          </li>
        ))}
      </ul>
    )}
  </div>
</Modal>


  {/* Modal details */}
  <Modal isOpen={showModal} onClose={() => handleCloeDetailsModal()}>
    <div className="flex flex-col items-center text-center px-6 space-y-4">
      <div className="flex flex-row w-full justify-between items-center">
        {isSelectedDealInLocalStorage ? (
          <button
            title="Remove from favorites"
            className="flex items-center gap-2"
          >
            <HeartMinus
              color="#f90101"
              onClick={() => selectedDeal && handleToggleFavorite(selectedDeal)}
            />
          </button>
        ) : (
          <button
            title="Add to favorites"
            className="flex items-center gap-2"
          >
            <HeartPlus
              color="#f90101"
              onClick={() => selectedDeal && handleToggleFavorite(selectedDeal)}
            />
          </button>
        )}
        <p className="text-2xl text-blue-600 font-bold">
          {selectedDeal?.title}
        </p>
      </div>

      <img
        src={selectedDeal?.thumb}
        alt={selectedDeal?.title}
        className="mx-auto w-80 rounded-lg shadow"
      />

      <p className="text-lg">
        <span className="line-through text-gray-500">
          From ${selectedDeal?.normalPrice}
        </span>{" "}
        <span className="text-green-600 font-semibold">
          to ${selectedDeal?.salePrice}
        </span>{" "}
        (<span className="text-red-600 font-medium">
          {parseInt(selectedDeal?.savings || "0")}% saving
        </span>)
      </p>

      <p className="text-gray-600">Store: {selectedDeal?.storeName}</p>

      <Button
        className="w-full md:w-auto bg-blue-500 text-white hover:bg-blue-600"
        onClick={() =>
          window.open(
            `https://www.cheapshark.com/redirect?dealID=${selectedDeal?.dealID}`,
            "_blank",
            "noopener,noreferrer"
          )
        }
      >
        Buy now
      </Button>
    </div>
  </Modal>

  {/* Footer */}
  <footer className="bg-blue-500/90 backdrop-blur-md py-4 px-6 text-sm text-gray-100 text-center md:text-left">
    &copy; {new Date().getFullYear()} Matheus Tavares. All rights reserved.
  </footer>
</div>

  );
}
