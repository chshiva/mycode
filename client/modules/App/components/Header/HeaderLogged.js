import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';

import mainStyle from '../../../../main.css';
import styles from './Header.css';


export function HeaderLogged(props, context) {
  const languageNodes = props.intl.enabledLanguages.map(
    lang => <li key={lang[1]} onClick={() => props.switchLanguage(lang[1])} className={lang[1] === props.intl.locale ? mainStyle.selected : ''}>{lang[0]}</li>
  );

  const cls = `${styles.header} ${mainStyle.bgPrimaryDark}`;
  const cls_ln = `${styles.languageSelect} hidden-xs hidden-sm`;
  const cls_mob = `${styles.mobMenu} hidden-lg hidden-md`;
  return (
    <div className={cls}>
      <div className={cls_mob}>
        <img src="/images/sub-nav-bars.png" />
      </div>
      <div className={styles.imgLogo}>
        <img src="/images/logos.png" />
      </div>
      <div className={cls_ln}>
        <div className={mainStyle.modDropDown}>
          <ul>
           <li className={mainStyle.modDropDownDrop}>
            <FontAwesome name="globe" />&nbsp;<FontAwesome name="arrow-circle-down" />
              <ul>
                {languageNodes}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

HeaderLogged.contextTypes = {
  router: React.PropTypes.object,
};

HeaderLogged.propTypes = {
  switchLanguage: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};


export default HeaderLogged;
