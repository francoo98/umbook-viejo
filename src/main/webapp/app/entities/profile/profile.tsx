import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IProfile } from 'app/shared/model/profile.model';
import { getEntities } from './profile.reducer';

export const Profile = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const profileList = useAppSelector(state => state.profile.entities);
  const loading = useAppSelector(state => state.profile.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="profile-heading" data-cy="ProfileHeading">
        <Translate contentKey="umbookApp.profile.home.title">Profiles</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="umbookApp.profile.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/profile/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="umbookApp.profile.home.createLabel">Create new Profile</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {profileList && profileList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="umbookApp.profile.id">Id</Translate>
                </th>
                <th>
                  <Translate contentKey="umbookApp.profile.username">Username</Translate>
                </th>
                <th>
                  <Translate contentKey="umbookApp.profile.password">Password</Translate>
                </th>
                <th>
                  <Translate contentKey="umbookApp.profile.email">Email</Translate>
                </th>
                <th>
                  <Translate contentKey="umbookApp.profile.creacion">Creacion</Translate>
                </th>
                <th>
                  <Translate contentKey="umbookApp.profile.ownedBy">Owned By</Translate>
                </th>
                <th>
                  <Translate contentKey="umbookApp.profile.follows">Follows</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {profileList.map((profile, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/profile/${profile.id}`} color="link" size="sm">
                      {profile.id}
                    </Button>
                  </td>
                  <td>{profile.username}</td>
                  <td>{profile.password}</td>
                  <td>{profile.email}</td>
                  <td>{profile.creacion ? <TextFormat type="date" value={profile.creacion} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td>{profile.ownedBy ? profile.ownedBy.id : ''}</td>
                  <td>
                    {profile.follows
                      ? profile.follows.map((val, j) => (
                          <span key={j}>
                            <Link to={`/profile/${val.id}`}>{val.id}</Link>
                            {j === profile.follows.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/profile/${profile.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/profile/${profile.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/profile/${profile.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="umbookApp.profile.home.notFound">No Profiles found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Profile;
