import React, { PureComponent } from 'react';
import Service from 'components/service/Service';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Modal from 'container/modal/Modal';
import * as Actions from 'actions';

class Services extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      clickedService: null,
    };
  }

  componentDidMount() {
    const { fetchAllServices } = this.props;
    fetchAllServices();
  }

  onOpenModal = (service) => {
    this.setState({ isModalOpen: true, clickedService: service });
  };

  onCloseModal = () => {
    this.setState({ isModalOpen: false, clickedService: null });
  };

  render() {
    const { services } = this.props;
    const { isModalOpen, clickedService } = this.state;
    return (
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-12">
        {services
          && services.map((service) => (
            <Service
              openModal={this.onOpenModal}
              key={service.name}
              service={service}
            />
          ))}
        <Modal
          isOpen={isModalOpen}
          onClose={this.onCloseModal}
          service={clickedService}
        />
      </div>
    );
  }
}

Services.propTypes = {
  services: PropTypes.instanceOf(Array).isRequired,
  fetchAllServices: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ services: state.allServices.services });

export default connect(mapStateToProps, Actions)(Services);
