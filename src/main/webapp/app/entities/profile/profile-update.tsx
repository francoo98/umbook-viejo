import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IPost } from 'app/shared/model/post.model';
import { getEntities as getPosts } from 'app/entities/post/post.reducer';
import { getEntities as getProfiles } from 'app/entities/profile/profile.reducer';
import { IProfile } from 'app/shared/model/profile.model';
import { getEntity, updateEntity, createEntity, reset } from './profile.reducer';

export const ProfileUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const users = useAppSelector(state => state.userManagement.users);
  const posts = useAppSelector(state => state.post.entities);
  const profiles = useAppSelector(state => state.profile.entities);
  const profileEntity = useAppSelector(state => state.profile.entity);
  const loading = useAppSelector(state => state.profile.loading);
  const updating = useAppSelector(state => state.profile.updating);
  const updateSuccess = useAppSelector(state => state.profile.updateSuccess);

  const handleClose = () => {
    navigate('/profile');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getUsers({}));
    dispatch(getPosts({}));
    dispatch(getProfiles({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...profileEntity,
      ...values,
      follows: mapIdList(values.follows),
      ownedBy: users.find(it => it.id.toString() === values.ownedBy.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...profileEntity,
          ownedBy: profileEntity?.ownedBy?.id,
          follows: profileEntity?.follows?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="umbookApp.profile.home.createOrEditLabel" data-cy="ProfileCreateUpdateHeading">
            <Translate contentKey="umbookApp.profile.home.createOrEditLabel">Create or edit a Profile</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="profile-id"
                  label={translate('umbookApp.profile.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('umbookApp.profile.username')}
                id="profile-username"
                name="username"
                data-cy="username"
                type="text"
              />
              <ValidatedField
                label={translate('umbookApp.profile.password')}
                id="profile-password"
                name="password"
                data-cy="password"
                type="text"
              />
              <ValidatedField label={translate('umbookApp.profile.email')} id="profile-email" name="email" data-cy="email" type="text" />
              <ValidatedField
                label={translate('umbookApp.profile.creacion')}
                id="profile-creacion"
                name="creacion"
                data-cy="creacion"
                type="date"
              />
              <ValidatedField
                id="profile-ownedBy"
                name="ownedBy"
                data-cy="ownedBy"
                label={translate('umbookApp.profile.ownedBy')}
                type="select"
              >
                <option value="" key="0" />
                {users
                  ? users.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                label={translate('umbookApp.profile.follows')}
                id="profile-follows"
                data-cy="follows"
                type="select"
                multiple
                name="follows"
              >
                <option value="" key="0" />
                {profiles
                  ? profiles.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/profile" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ProfileUpdate;
