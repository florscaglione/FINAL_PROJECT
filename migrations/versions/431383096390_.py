"""empty message

Revision ID: 431383096390
Revises: 2807edd385a2
Create Date: 2021-10-07 18:24:59.298440

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '431383096390'
down_revision = '2807edd385a2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('company',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=120), nullable=False),
    sa.Column('cif', sa.String(length=9), nullable=False),
    sa.Column('contact', sa.String(length=80), nullable=False),
    sa.Column('phone', sa.String(length=80), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('cif'),
    sa.UniqueConstraint('email')
    )
    op.create_table('academic_training',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('academic_degree', sa.String(length=300), nullable=False),
    sa.Column('study_center', sa.String(length=300), nullable=False),
    sa.Column('start_date', sa.DateTime(), nullable=False),
    sa.Column('end_date', sa.DateTime(), nullable=True),
    sa.Column('in_progress', sa.Boolean(), nullable=True),
    sa.Column('is_academic', sa.Boolean(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('experience',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=200), nullable=False),
    sa.Column('description', sa.String(length=300), nullable=False),
    sa.Column('start_date', sa.DateTime(), nullable=False),
    sa.Column('end_date', sa.DateTime(), nullable=True),
    sa.Column('in_progress', sa.Boolean(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('offer',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=200), nullable=False),
    sa.Column('remote_work', sa.String(length=120), nullable=False),
    sa.Column('contract_type', sa.String(length=80), nullable=False),
    sa.Column('salary_range', sa.String(length=9), nullable=False),
    sa.Column('requirement', sa.String(length=80), nullable=False),
    sa.Column('offer_description', sa.String(length=80), nullable=False),
    sa.Column('social_benefit', sa.String(length=80), nullable=True),
    sa.Column('company_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['company_id'], ['company.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('profession',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('favorite_offer',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('offer_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['offer_id'], ['offer.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('inscription',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('offer_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['offer_id'], ['offer.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('profession_user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('profession_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['profession_id'], ['profession.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column('user', sa.Column('name', sa.String(length=120), nullable=False))
    op.add_column('user', sa.Column('lastname', sa.String(length=120), nullable=False))
    op.add_column('user', sa.Column('phone', sa.String(length=15), nullable=False))
    op.add_column('user', sa.Column('birth_date', sa.DateTime(), nullable=True))
    op.add_column('user', sa.Column('skill', sa.String(length=50), nullable=False))
    op.drop_column('user', 'is_active')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('is_active', sa.BOOLEAN(), autoincrement=False, nullable=False))
    op.drop_column('user', 'skill')
    op.drop_column('user', 'birth_date')
    op.drop_column('user', 'phone')
    op.drop_column('user', 'lastname')
    op.drop_column('user', 'name')
    op.drop_table('profession_user')
    op.drop_table('inscription')
    op.drop_table('favorite_offer')
    op.drop_table('profession')
    op.drop_table('offer')
    op.drop_table('experience')
    op.drop_table('academic_training')
    op.drop_table('company')
    # ### end Alembic commands ###