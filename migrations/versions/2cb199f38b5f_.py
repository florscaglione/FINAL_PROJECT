"""empty message

Revision ID: 2cb199f38b5f
Revises: 431383096390
Create Date: 2021-10-23 14:43:17.624268

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '2cb199f38b5f'
down_revision = '431383096390'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('academic_training', 'start_date',
               existing_type=postgresql.TIMESTAMP(),
               nullable=True)
    op.drop_constraint('academic_training_user_id_fkey', 'academic_training', type_='foreignkey')
    op.create_foreign_key(None, 'academic_training', 'user', ['user_id'], ['id'], ondelete='CASCADE')
    op.drop_constraint('experience_user_id_fkey', 'experience', type_='foreignkey')
    op.create_foreign_key(None, 'experience', 'user', ['user_id'], ['id'], ondelete='CASCADE')
    op.drop_constraint('offer_company_id_fkey', 'offer', type_='foreignkey')
    op.create_foreign_key(None, 'offer', 'company', ['company_id'], ['id'], ondelete='CASCADE')
    op.drop_constraint('profession_user_id_fkey', 'profession', type_='foreignkey')
    op.drop_column('profession', 'user_id')
    op.drop_column('user', 'skill')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('skill', sa.VARCHAR(length=50), autoincrement=False, nullable=False))
    op.add_column('profession', sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=False))
    op.create_foreign_key('profession_user_id_fkey', 'profession', 'user', ['user_id'], ['id'])
    op.drop_constraint(None, 'offer', type_='foreignkey')
    op.create_foreign_key('offer_company_id_fkey', 'offer', 'company', ['company_id'], ['id'])
    op.drop_constraint(None, 'experience', type_='foreignkey')
    op.create_foreign_key('experience_user_id_fkey', 'experience', 'user', ['user_id'], ['id'])
    op.drop_constraint(None, 'academic_training', type_='foreignkey')
    op.create_foreign_key('academic_training_user_id_fkey', 'academic_training', 'user', ['user_id'], ['id'])
    op.alter_column('academic_training', 'start_date',
               existing_type=postgresql.TIMESTAMP(),
               nullable=False)
    # ### end Alembic commands ###
