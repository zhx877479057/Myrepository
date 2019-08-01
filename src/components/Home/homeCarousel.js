import React from 'react';
import { Carousel } from 'antd';
import styles from './homeCarousel.less';

class HomeCarousel extends React.Component {
  render() {
    return (
      <Carousel autoplay className={styles.slide}>
        <div className={styles.slide}>
          <h3 className={styles.Sh3}>推荐课程一</h3>
        </div>

        <div className={styles.slide}>
          <h3 className={styles.Sh3}>推荐课程二</h3>
        </div>

        <div className={styles.slide}>
          <h3 className={styles.Sh3}>推荐课程三</h3>
        </div>

        <div className={styles.slide}>
          <h3 className={styles.Sh3}>推荐课程四</h3>
        </div>
      </Carousel>
    );
    mountNode;
  }
}

export default HomeCarousel;
