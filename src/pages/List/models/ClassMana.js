import { getfakequery, removeFakeList, updateFakeList, addFakeList } from '@/services/ClassMana';

export default {
  namespace: 'ClassMana',

  state: {
    list: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getfakequery, payload);
      yield put({
        type: 'show',
        payload: response,
      });
    },
    *submit({ payload }, { call, put }) {
      let callback;
      if (payload.id) {
        callback = Object.keys(payload).length === 1 ? removeFakeList : updateFakeList;
      } else {
        callback = addFakeList;
      }
      const response = yield call(callback, payload); // post
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
  },

  reducers: {
    show(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};
