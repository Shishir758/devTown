import { useEffect, useState } from "react";


const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortAsc, SetSortAsc] = useState(true);

  useEffect(() => {
    fetch('demoData.json')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data)
      })
  }, [])

  const totalProducts = filteredProducts.length;
  const itemsPerPage = 5
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const pageNumbers = [];
  for (let index = 1; index <= totalPages; index++) {
    pageNumbers.push(index);}

  const startItem = (currentPage - 1) * itemsPerPage;
  const endItem = startItem + itemsPerPage;
  const dataBeforSort = filteredProducts.slice(startItem, endItem);

  const displayData = dataBeforSort.sort((a, b) =>
    sortAsc ? a.price - b.price : b.price - a.price);


  const handleSort = () => {
    SetSortAsc(!sortAsc);}

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);};

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProducts(products)}
      else {const filtered = products.filter((product) => product.category === selectedCategory);
      setFilteredProducts(filtered);}
      setCurrentPage(1);
  }, [selectedCategory, products]);


  return (
    <div className="lg:ml-5">
    <div className='flex flex-col lg:flex-row items-center justify-evenly mt-5'>
        <p>Filter by: <select className="p-2 mb-5 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleCategoryChange} value={selectedCategory}>
          <option value="All">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Home & Kitchen">Home & Kitchen</option>
        </select> </p>
        <div>
          <p>Sort by price:
            <button onClick={handleSort} className="btn btn-primary ml-5 mb-3">{sortAsc ? 'High to Low' : 'Low to High'}</button>
          </p>
        </div>
      </div>
      

      <div className="overflow-x-auto">
        <table className="table m-auto">
          <thead>
            <tr><th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Discription</th>
              <th>Price</th></tr>
          </thead>
          {displayData.map((product, index) =>
            <tbody key={product.id}>
              <tr><td>{index + 1}</td>
                <td><div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-11 h-11">
                      <img src={product.image} alt="productImage" />
                    </div>
                  </div>
                  
                </div>
                </td>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <th>
                  <button className="btn btn-ghost btn-xs">${product.price}</button>
                </th>
              </tr>
            </tbody>
          )}
        </table>
      </div>

      {/*Pagination*/}
      <div className="text-center mb-1">
        {pageNumbers.map(number =>
          <div className="inline" key={number}>
            <button onClick={() => setCurrentPage(number)} className={`btn mr-2 ${currentPage === number ? 'selected' : ''}`}
              style={{ color: currentPage === number ? 'orange' : '' }}>{number}</button></div>)}
      </div>
    </div>
    
  );
};

export default ProductsList;

