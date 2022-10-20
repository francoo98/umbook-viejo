import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IProfile } from 'app/shared/model/profile.model';
import { getEntities as getProfiles } from 'app/entities/profile/profile.reducer';
import { IPost } from 'app/shared/model/post.model';
import { getEntity, updateEntity, createEntity, reset } from './post.reducer';

export const PostUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const profiles = useAppSelector(state => state.profile.entities);
  const postEntity = useAppSelector(state => state.post.entity);
  const loading = useAppSelector(state => state.post.loading);
  const updating = useAppSelector(state => state.post.updating);
  const updateSuccess = useAppSelector(state => state.post.updateSuccess);

  const handleClose = () => {
    navigate('/post');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getProfiles({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...postEntity,
      ...values,
      likes: mapIdList(values.likes),
      createdBy: profiles.find(it => it.id.toString() === values.createdBy.toString()),
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
          ...postEntity,
          likes: postEntity?.likes?.map(e => e.id.toString()),
          createdBy: postEntity?.createdBy?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="umbookApp.post.home.createOrEditLabel" data-cy="PostCreateUpdateHeading">
            <Translate contentKey="umbookApp.post.home.createOrEditLabel">Create or edit a Post</Translate>
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
                  id="post-id"
                  label={translate('umbookApp.post.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField label={translate('umbookApp.post.title')} id="post-title" name="title" data-cy="title" type="text" />
              <ValidatedField
                label={translate('umbookApp.post.contents')}
                id="post-contents"
                name="contents"
                data-cy="contents"
                type="text"
              />
              <ValidatedField label={translate('umbookApp.post.like')} id="post-like" data-cy="like" type="select" multiple name="likes">
                <option value="" key="0" />
                {profiles
                  ? profiles.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="post-createdBy"
                name="createdBy"
                data-cy="createdBy"
                label={translate('umbookApp.post.createdBy')}
                type="select"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/post" replace color="info">
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

export default PostUpdate;
