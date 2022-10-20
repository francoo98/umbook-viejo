import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './profile.reducer';

export const ProfileDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const profileEntity = useAppSelector(state => state.profile.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="profileDetailsHeading">
          <Translate contentKey="umbookApp.profile.detail.title">Profile</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="umbookApp.profile.id">Id</Translate>
            </span>
          </dt>
          <dd>{profileEntity.id}</dd>
          <dt>
            <span id="username">
              <Translate contentKey="umbookApp.profile.username">Username</Translate>
            </span>
          </dt>
          <dd>{profileEntity.username}</dd>
          <dt>
            <span id="password">
              <Translate contentKey="umbookApp.profile.password">Password</Translate>
            </span>
          </dt>
          <dd>{profileEntity.password}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="umbookApp.profile.email">Email</Translate>
            </span>
          </dt>
          <dd>{profileEntity.email}</dd>
          <dt>
            <span id="creacion">
              <Translate contentKey="umbookApp.profile.creacion">Creacion</Translate>
            </span>
          </dt>
          <dd>
            {profileEntity.creacion ? <TextFormat value={profileEntity.creacion} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <Translate contentKey="umbookApp.profile.ownedBy">Owned By</Translate>
          </dt>
          <dd>{profileEntity.ownedBy ? profileEntity.ownedBy.id : ''}</dd>
          <dt>
            <Translate contentKey="umbookApp.profile.follows">Follows</Translate>
          </dt>
          <dd>
            {profileEntity.follows
              ? profileEntity.follows.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {profileEntity.follows && i === profileEntity.follows.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/profile" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/profile/${profileEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ProfileDetail;
