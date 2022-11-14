import React, { useContext, useCallback } from 'react';
import { MainContext } from '../contexts/MainContext';
import { BsViewList } from 'react-icons/bs';
import { union_polygons } from '../utils/transformation';
import { olFeatures2geojson, geojson2olFeatures } from '../utils/featureCollection';

export const MenuActions = () => {
  const { items, dispatchSetItems } = useContext(MainContext);

  const setItems = useCallback(
    (items) => {
      dispatchSetItems({
        type: 'SET_ITEMS',
        payload: items,
      });
    },
    [dispatchSetItems]
  );

  const merge_polygons = () => {
    const fc = olFeatures2geojson(items);
    const mergedFeatures = union_polygons(fc.features);
    const mergedItems = geojson2olFeatures(mergedFeatures);
    setItems(mergedItems);
  };

  document.addEventListener('keydown', (e) => {
    // Merge polygonos
    if (e.key === 'm') {
      merge_polygons();
    }
  });
  return (
    <div>
      <div className="menuHeader">
        <BsViewList></BsViewList>
        <span className=" text-base font-medium flex-1 duration-200 false">
          Polygon Action
        </span>
      </div>

      <div className="flex flex-row mt-3">
        <button
          className="custom_button"
          onClick={() => {
            merge_polygons();
          }}
        >
          Merge (M)
        </button>
      </div>
    </div>
  );
};
