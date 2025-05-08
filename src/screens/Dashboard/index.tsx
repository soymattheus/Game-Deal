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
    <div className="flex flex-col w-full min-h-screen mx-auto">
        <div className="flex items-center justify-between p-4 h-14 bg-blue-300 shadow">
            <h1 className="text-2xl font-semibold">Game Deals</h1>
            <p className="hidden md:flex text-blue-600">Thousands of deals</p>
            <Menu onClick={() => setOpenMobileMenu(true)} className='md:hidden' size={32} color="blue" />
        </div>

        <div className='flex flex-row w-full'>
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
            <div className="flex flex-col w-full md:w-4/5 md:px-4">
              {/* Header body */}
              <div className='flex flex-col md:flex-row w-full items-center justify-center md:justify-between text-center font-semibold text-blue-600 pt-4 px-4'>
              <div className="w-2/3 flex justify-start">
                <p>
                  Welcome! We're glad to have you here. Explore and enjoy the best deals just for you!
                </p>
              </div>

              <div className="flex flex-row w-1/3 items-center justify-end space-x-2">
                <p className="text-gray-500 text-sm">View as:</p>

                {/* List View */}
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center transition-opacity ${
                    viewMode === 'list' ? 'opacity-100' : 'opacity-40'
                  }`}
                  title="List"
                >
                  <Table size={20} color="blue" />
                </button>

                {/* Grid View */}
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center transition-opacity ${
                    viewMode === 'grid' ? 'opacity-100' : 'opacity-40'
                  }`}
                  title="Grid"
                >
                  <LayoutGrid size={20} color="blue" />
                </button>
              </div>
            </div>

            { 
              viewMode === 'grid' ? (
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
                  {
                    dealsWithStoreName.map((deal) => (
                      <tr
                        key={deal.dealID}
                        onClick={() => handleSelectDeal(deal)}
                        className="hover:bg-blue-100 cursor-pointer"
                      >
                        <td className="p-2 border flex items-center gap-2 w-auto whitespace-nowrap overflow-x-hidden">
                          <img
                            src={deal.thumb}
                            alt={deal.title}
                            className="w-14 h-14 rounded"
                          />
                          {deal.title}
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
                    ))
                  }
                </DataTable>
              )
            }
          </div>
        </div>

        {/* Modal favorites */}
        <Modal
            isOpen={showFavoritesModal}
            onClose={() => setShowFavoritesModal(false)}
            title='Your favorite deals'
        >
            <div className="flex flex-col text-center items-center justify-center">
              <div className='flex flex-col w-full text-start px-8'>
                {favorites.length === 0 ? (
                  <p className="text-gray-500">No favorites yet.</p>
                ) : (
                  <ul className="list-disc list-inside text-blue-700">
                    {favorites.map((favorite, index) => (
                      <li key={index}>
                        <span 
                          className='text-wrap break-words cursor-pointer' 
                          onClick={() => handleopenDetailsModal(favorite)}
                        >
                          {favorite?.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
        </Modal>
      
        {/* Modal details */}
        <Modal
            isOpen={showModal}
            onClose={() => handleCloeDetailsModal()}
        >
            <div className="flex flex-col text-center items-center justify-center">
              <div className='flex flex-row w-full justify-between items-center px-8'>
                {
                  isSelectedDealInLocalStorage ? (
                    <button title='Remove from favorites' className='flex items-center gap-2'>
                      <HeartMinus color="#f90101" onClick={() => selectedDeal && handleToggleFavorite(selectedDeal)}/>
                    </button>
                  ) : (
                    <button title='Add to favorites' className='flex items-center gap-2'>
                      <HeartPlus color="#f90101" onClick={() => selectedDeal && handleToggleFavorite(selectedDeal)}/>
                    </button>
                  )
                }
                <p className="text-2xl text-blue-500 font-medium mt-2">{selectedDeal?.title}</p>
              </div>
              <img src={selectedDeal?.thumb} alt={selectedDeal?.title} className="mx-auto mb-4 w-80 rounded" />
                
              <p>
                <span className="line-through text-gray-500">From ${selectedDeal?.normalPrice}</span> {' '}
                <span className="text-green-600">to ${selectedDeal?.salePrice}</span>
                {' ('}<span className="text-red-600">
                  {parseInt(selectedDeal?.savings || '0')}% saving
                </span>{')'}
              </p>
              <p className="text-gray-500">Store: {selectedDeal?.storeName}</p>

              <Button
              className='justify-center'
                onClick={() => {
                    window.open(`https://www.cheapshark.com/redirect?dealID=${selectedDeal?.dealID}`, '_blank', 'noopener,noreferrer');
                }}
              >
                Buy now
              </Button>
            </div>
        </Modal>

        <footer className="bg-blue-300 py-4 text-start px-4 text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Matheus Tavares. All rights reserved.
        </footer>
    </div>
  );
}
