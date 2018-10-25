import React from 'react';
import Link from 'components/Link';
import {inject, observer} from 'mobx-react';
import CompanyListItem from './CompanyListItem';
import YesOrNoFilter from './YesOrNoFilter';


@inject(({store}) => {
  return {companyStore: store.companyStore};
})
@observer
class CompanyList extends React.Component {

  constructor(props) {
    super(props);
    this.handleClickPage = this.handleClickPage.bind(this);
  }

  componentDidMount() {
  }

  handleClickPage = (page) => {
    const {companyStore} = this.props;
    companyStore.fetchCompanies({page});
  };

  render() {
    const {query, companyStore} = this.props;
    const {list, table} = companyStore;
    const listComponent = list.map(id => (
      <CompanyListItem key={id} {...table[id]} />
    ));
    const tableComponent = Object.keys(table).map((key) => (
      <div key={key}>
        {key}, {table[key].slug}
      </div>
    ));
    return (
      <div>
        <YesOrNoFilter
          label={'기업활성화여부'}
          queryMap={companyStore.queryMap}
          checkKey={'isActive'}
        />
        <YesOrNoFilter
          label={'기업연동여부'}
          queryMap={companyStore.queryMap}
          checkKey={'hasRelation'}
        />
        <div>
          {listComponent}
        </div>
        <div>
          <Link href={`?page=1${companyStore.queryString}`}>1</Link>
          <Link href={`?page=2${companyStore.queryString}`}>2</Link>
          <Link href={`?page=3${companyStore.queryString}`}>3</Link>
        </div>
        {/*<div>*/}
          {/*<h3>Table</h3>*/}
          {/*{tableComponent}*/}
          {/*<br/>*/}
        {/*</div>*/}
      </div>
    );
  }
}

export default CompanyList;
