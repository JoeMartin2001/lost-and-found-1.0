import {NavigationProp} from '@react-navigation/core';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  Image,
} from 'react-native';
import {baseUrl} from '../../../../config/baseUrl';
import {AppParamList} from '../../../../navigation/AppParamList';
import {Divider, FAB} from 'react-native-paper';
import {colors} from '../../../../config/colors';
import {useQuery} from 'react-query';
import CustomLoading from '../../../../components/CustomLoading';
import HomeLostFilterModal from './HomeLostFilterModal';
import CustomError from '../../../../components/CustomError';
import {useAppSelector} from '../../../../hooks/hooks';
import {selectSearchFilterState} from '../../../../redux/searchFilter/searchFilterSlice';
import HomeLostRenderItem from './HomeLostRenderItem';
import RenderLostListFooter from './RenderLostListFooter';

const fetchLostItems = async ({
  page,
  filterCase,
  region,
}: {
  page: Number;
  filterCase: string;
  region: string;
}) => {
  try {
    const response = await fetch(
      `${baseUrl}/api/item/getAllItems?page=${page}&limit=10&region=${region}&case=${filterCase}`,
    );
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const HomeLostTab = ({
  navigation,
}: {
  navigation: NavigationProp<AppParamList, 'Home'>;
}) => {
  const searchFilter = useAppSelector(selectSearchFilterState);
  const [refreshing, setRefreshing] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(true);
  const [itemId, setItemId] = useState('');
  const [page, setPage] = useState<any>(1);

  const {isError, isFetching, data, refetch} = useQuery(
    ['found-items', page, searchFilter.case, searchFilter.region],
    () =>
      fetchLostItems({
        page: page,
        filterCase: searchFilter.case,
        region: searchFilter.region,
      }),
    {
      keepPreviousData: true,
    },
  );

  const handleInfoModalPress = (id: string) => {
    setItemId(id);
    setIsInfoModalVisible(true);
  };

  const onRefresh = React.useCallback(async () => {
    setPage(1);
    setRefreshing(true);

    await refetch();
    setRefreshing(false);
  }, []);

  if (isFetching) return <CustomLoading />;
  if (isError) return <CustomError refresh={onRefresh} />;

  return (
    <View style={styles.main}>
      <View style={styles.listView}>
        {data.results.length ? (
          <FlatList
            data={data.results}
            renderItem={({item}) => (
              <HomeLostRenderItem
                item={item}
                handleInfoModalPress={handleInfoModalPress}
              />
            )}
            keyExtractor={(item, idx) => idx.toString()}
            ListFooterComponent={
              data.next || data.previous
                ? () => (
                    <RenderLostListFooter
                      data={data}
                      setPage={setPage}
                      page={page}
                    />
                  )
                : null
            }
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ItemSeparatorComponent={() => <Divider />}
          />
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{width: 80, height: 80}}>
              <Image
                source={require('./img/empty-tray.png')}
                style={{width: undefined, height: undefined, flexGrow: 1}}
              />
            </View>
            <Text style={{fontSize: 20}}>Empty region!</Text>
          </View>
        )}
      </View>
      <FAB
        style={styles.fab}
        icon="filter"
        onPress={() => setFilterModal(true)}
      />
      <HomeLostFilterModal
        setPage={setPage}
        filterModal={filterModal}
        setFilterModal={setFilterModal}
      />
      {/* <HomeLostInfoModal
        itemId={itemId}
        isInfoModalVisible={isInfoModalVisible}
        setIsInfoModalVisible={setIsInfoModalVisible}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  listView: {
    flex: 1,
  },
  loadMoreView: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '25%',
  },
  loadMoreTouchable: {},
  loadMoreText: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.primaryWithOpacity,
    borderRadius: 25,
  },
  loadMoreTextDisabled: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
    backgroundColor: '#e5e5e5',
    borderRadius: 25,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: colors.primary,
  },
});

export default HomeLostTab;
