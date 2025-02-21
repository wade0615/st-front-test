import { useEffect, useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';
import { setSelectedValue } from '../../store/reducers/initReducer';
import './BaseLayout.scss';

import api from 'services/api';

import ExceptionHandleService from 'utils/ExceptionHandler';
const _EHS = new ExceptionHandleService({
  _NAME: 'layout/Baselayout.tsx',
  _NOTICE: ''
});

/* 基本樣式 */
function BaseLayout() {
  return (
    <div id='base_layout'>
      {/* Header */}
      <BaseLayoutHeader />
      {/* Main content */}
      <Outlet></Outlet>
      {/* Footer */}
      <BlaseLayoutFooter />
    </div>
  );
}

/** Footer */
function BlaseLayoutFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='base_layout_footer'>
      <p>© {currentYear} By Harry Potter</p>
      <p>Theme From Base Layout</p>
    </footer>
  );
}

/** Header */
function BaseLayoutHeader() {
  const dispatch = useDispatch();

  const [taiwanStockInfoList, setTaiwanStockInfoList] = useState<
    {
      id: number;
      label: string;
    }[]
  >([]);

  /** 取得列表 */
  const getTaiwanStockInfoList = useCallback(async () => {
    try {
      const list = await api.getTaiwanStockInfoList();
      if (list) {
        return Array.from(
          new Map(
            list.map((item) => [
              `${item.stock_name}(${item.stock_id})`,
              {
                id: parseInt(item.stock_id, 10),
                label: `${item.stock_name}(${item.stock_id})`
              }
            ])
          ).values()
        );
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      _EHS.errorReport(
        errorMessage,
        'getTaiwanStockInfoList',
        _EHS._LEVEL.ERROR
      );
    }
  }, []);

  // 初始化
  useEffect(() => {
    const init = async () => {
      try {
        const stockList = await getTaiwanStockInfoList();
        if (stockList) {
          setTaiwanStockInfoList(stockList);
        }
      } catch (error) {
        const errorMessage = (error as Error).message;
        _EHS.errorReport(errorMessage, 'init', _EHS._LEVEL.ERROR);
      }
    };
    init();
  }, [getTaiwanStockInfoList]);

  const handleChange = (
    event: React.SyntheticEvent,
    value: { label: string; id: number } | null
  ) => {
    dispatch(setSelectedValue(value ? value.label : null));
  };

  return (
    <header className='base_layout_header'>
      <Autocomplete
        disablePortal
        options={taiwanStockInfoList}
        sx={{ width: 600 }}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label=''
            placeholder='輸入台/美股代號，查看公司價值'
          />
        )}
      />
    </header>
  );
}

export default BaseLayout;
